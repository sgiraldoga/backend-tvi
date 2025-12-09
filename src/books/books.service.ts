import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { User } from '../user/entities/user.entity';
import { Destiny } from '../destinies/entities/destiny.entity';
import { Cabin } from '../cabin/entities/cabin.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookingStatus } from '../enums/booking-status.enum';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Destiny)
    private readonly destinyRepository: Repository<Destiny>,
    @InjectRepository(Cabin)
    private readonly cabinRepository: Repository<Cabin>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { userId, destinyId, cabinId, departureDate, returnDate, passengers } = createBookDto;

    // Validar fechas
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (departure < today) {
      throw new BadRequestException('La fecha de salida no puede ser en el pasado');
    }

    if (returnD <= departure) {
      throw new BadRequestException('La fecha de regreso debe ser posterior a la fecha de salida');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const destiny = await this.destinyRepository.findOne({ where: { id: destinyId } });
    if (!destiny) {
      throw new NotFoundException(`Destino con ID ${destinyId} no encontrado`);
    }

    // Validate cabin and obtener nave
    const cabin = await this.cabinRepository.findOne({
      where: { id: cabinId },
      relations: ['starship'],
    });
    if (!cabin) {
      throw new NotFoundException(`Cabina con ID ${cabinId} no encontrada`);
    }

    const starship = cabin.starship;

    // Verificar disponibilidad de la nave en las fechas seleccionadas
    const overlappingBookings = await this.bookRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.cabin', 'cabin')
      .leftJoinAndSelect('cabin.starship', 'starship')
      .leftJoinAndSelect('booking.destiny', 'destiny')
      .where('starship.id = :starshipId', { starshipId: starship.id })
      .andWhere('booking.status != :cancelled', { cancelled: BookingStatus.CANCELLED })
      .andWhere('(booking.departureDate <= :returnDate AND booking.returnDate >= :departureDate)', {
        departureDate,
        returnDate,
      })
      .getMany();

    // Verificar que todas las reservas solapadas sean al mismo destino
    const differentDestinyBooking = overlappingBookings.find(
      booking => booking.destiny.id !== destinyId,
    );

    if (differentDestinyBooking) {
      throw new ConflictException(
        `La nave ya tiene una reserva programada a otro destino (${differentDestinyBooking.destiny.name}) en las fechas seleccionadas`,
      );
    }

    // Calcular capacidad ocupada en esas fechas
    const occupiedCapacity = overlappingBookings.reduce(
      (sum, booking) => sum + booking.ticketCount,
      0,
    );

    const availableCapacity = starship.capacity - occupiedCapacity;

    if (passengers.length > availableCapacity) {
      throw new BadRequestException(
        `Capacidad insuficiente. Disponible: ${availableCapacity}, Solicitado: ${passengers.length}`,
      );
    }

    // Calcular precio
    const ticketPrice = destiny.price + cabin.price;
    const totalPrice = ticketPrice * passengers.length;

    // Crear la reserva
    const booking = this.bookRepository.create({
      user,
      destiny,
      cabin,
      departureDate: departure,
      returnDate: returnD,
      ticketCount: passengers.length,
      totalPrice,
      status: BookingStatus.CONFIRMED,
    });

    const savedBooking = await this.bookRepository.save(booking);

    // Crear los tickets
    const tickets = passengers.map(passenger =>
      this.ticketRepository.create({
        booking: savedBooking,
        passengerName: passenger.name,
        price: ticketPrice,
      }),
    );

    await this.ticketRepository.save(tickets);

    // Retornar la reserva con los tickets
    return this.findOne(savedBooking.id);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['user', 'destiny', 'cabin', 'cabin.starship', 'tickets'],
      select: {
        user: { id: true, name: true, email: true },
        destiny: { id: true, name: true },
        cabin: { id: true, name: true, starship: { id: true, name: true } },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Book> {
    const booking = await this.bookRepository.findOne({
      where: { id },
      relations: ['user', 'destiny', 'cabin', 'cabin.starship', 'tickets'],
    });

    if (!booking) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return booking;
  }

  async findByUser(userId: number): Promise<Book[]> {
    return this.bookRepository.find({
      where: { user: { id: userId } },
      relations: ['destiny', 'cabin', 'cabin.starship', 'tickets'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const booking = await this.findOne(id);

    if (updateBookDto.status) {
      booking.status = updateBookDto.status;
    }

    await this.bookRepository.save(booking);
    return this.findOne(id);
  }

  async cancel(id: number): Promise<Book> {
    const booking = await this.findOne(id);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('La reserva ya está cancelada');
    }

    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('No se puede cancelar una reserva completada');
    }

    booking.status = BookingStatus.CANCELLED;
    await this.bookRepository.save(booking);

    return this.findOne(id);
  }

  async getAvailableStarships(destinyId: number, departureDate: string, returnDate: string) {
    // Obtener todas las naves con sus cabinas
    const cabins = await this.cabinRepository.find({
      relations: ['starship'],
    });

    // Agrupar cabinas por nave
    const starshipMap = new Map<
      number,
      { starship: { id: number; name: string; capacity: number }; cabins: Cabin[] }
    >();
    cabins.forEach(cabin => {
      if (!starshipMap.has(cabin.starship.id)) {
        starshipMap.set(cabin.starship.id, {
          starship: cabin.starship,
          cabins: [],
        });
      }
      starshipMap.get(cabin.starship.id)!.cabins.push(cabin);
    });

    const result: Array<{ id: number; name: string; cabins: Cabin[]; availableCapacity: number }> =
      [];

    for (const [starshipId, data] of starshipMap) {
      // Buscar reservas que se solapen con las fechas
      const overlappingBookings = await this.bookRepository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.cabin', 'cabin')
        .leftJoinAndSelect('cabin.starship', 'starship')
        .leftJoinAndSelect('booking.destiny', 'destiny')
        .where('starship.id = :starshipId', { starshipId })
        .andWhere('booking.status != :cancelled', { cancelled: BookingStatus.CANCELLED })
        .andWhere(
          '(booking.departureDate <= :returnDate AND booking.returnDate >= :departureDate)',
          { departureDate, returnDate },
        )
        .getMany();

      // Verificar si hay reservas a otro destino
      const hasDifferentDestiny = overlappingBookings.some(
        booking => booking.destiny.id !== destinyId,
      );

      if (hasDifferentDestiny) {
        continue; // Esta nave no está disponible para este destino
      }

      // Calcular capacidad disponible
      const occupiedCapacity = overlappingBookings.reduce(
        (sum, booking) => sum + booking.ticketCount,
        0,
      );

      const availableCapacity = data.starship.capacity - occupiedCapacity;

      if (availableCapacity > 0) {
        result.push({
          ...data.starship,
          cabins: data.cabins,
          availableCapacity,
        });
      }
    }

    return result;
  }
}
