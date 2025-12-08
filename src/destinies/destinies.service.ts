import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinyDto } from './dto/create-destiny.dto';
import { UpdateDestinyDto } from './dto/update-destiny.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destiny } from './entities/destiny.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestiniesService {
  private readonly defaultSelect: (keyof Destiny)[] = [
    'id',
    'name',
    'description',
    'image',
    'price',
    'system',
    'gravity',
    'atmosphere',
    'dayNightCycle',
    'population',
    'averageTemperature',
    'distance',
  ];

  constructor(
    @InjectRepository(Destiny)
    private readonly destinyRepository: Repository<Destiny>,
  ) {}

  async create(createDestinyDto: CreateDestinyDto) {
    const destiny = this.destinyRepository.create(createDestinyDto);

    try {
      const savedDestiny = await this.destinyRepository.save(destiny);

      return savedDestiny;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El destino ya existe o el nombre está duplicado');
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.destinyRepository.find({
      select: this.defaultSelect,
      order: { name: 'DESC' },
    });
  }

  async findOne(id: number) {
    const destiny = await this.destinyRepository.findOne({
      select: this.defaultSelect,
      where: { id },
    });

    if (!destiny) {
      throw new NotFoundException(`Destino con ID ${id} no encontrado`);
    }

    return destiny;
  }

  async update(id: number, updateDestinyDto: UpdateDestinyDto) {
    if (Object.keys(updateDestinyDto).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    const destiny = await this.findOne(id);
    Object.assign(destiny, updateDestinyDto);

    return this.destinyRepository.save(destiny);
  }

  async remove(id: number) {
    const destiny = await this.findOne(id);

    return this.destinyRepository.remove(destiny);
  }
}
