import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['booking', 'booking.destiny'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['booking', 'booking.destiny', 'booking.cabin'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    return ticket;
  }

  async findByBooking(bookingId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { booking: { id: bookingId } },
      order: { createdAt: 'ASC' },
    });
  }
}
