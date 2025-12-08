import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinyDto } from './dto/create-destiny.dto';
import { UpdateDestinyDto } from './dto/update-destiny.dto';
import { FilterDestinyDto } from './dto/filter-destiny.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destiny } from './entities/destiny.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestiniesService {
  private readonly defaultSelect: (keyof Destiny)[] = [
    'id',
    'name',
    'description',
    'images',
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

  async findAll(filters: FilterDestinyDto) {
    const {
      name,
      system,
      atmosphere,
      minPrice,
      maxPrice,
      minDistance,
      maxDistance,
      minTemperature,
      maxTemperature,
      page = 1,
      limit = 10,
      sortBy = 'name',
      order = 'ASC',
    } = filters;

    const queryBuilder = this.destinyRepository.createQueryBuilder('destiny');

    if (name) {
      queryBuilder.andWhere('destiny.name ILIKE :name', { name: `%${name}%` });
    }

    if (system) {
      queryBuilder.andWhere('destiny.system ILIKE :system', { system: `%${system}%` });
    }

    if (atmosphere) {
      queryBuilder.andWhere('destiny.atmosphere = :atmosphere', { atmosphere });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('destiny.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('destiny.price <= :maxPrice', { maxPrice });
    }

    if (minDistance !== undefined) {
      queryBuilder.andWhere('destiny.distance >= :minDistance', { minDistance });
    }
    if (maxDistance !== undefined) {
      queryBuilder.andWhere('destiny.distance <= :maxDistance', { maxDistance });
    }

    if (minTemperature !== undefined) {
      queryBuilder.andWhere('destiny.averageTemperature >= :minTemperature', { minTemperature });
    }
    if (maxTemperature !== undefined) {
      queryBuilder.andWhere('destiny.averageTemperature <= :maxTemperature', { maxTemperature });
    }

    const total = await queryBuilder.getCount();

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // sorting
    const validSortFields = ['name', 'price', 'distance', 'averageTemperature'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    queryBuilder.orderBy(`destiny.${sortField}`, order === 'DESC' ? 'DESC' : 'ASC');

    const data = await queryBuilder.getMany();

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      result: data,
    };
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
