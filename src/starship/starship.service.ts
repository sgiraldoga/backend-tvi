import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Repository } from 'typeorm';
import { StarshipStatus } from 'src/enums/starship-status.enum';
import { Cabin } from 'src/cabin/entities/cabin.entity';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,

    @InjectRepository(Cabin)
    private readonly cabinRepository: Repository<Cabin>,
  ) {}

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const starship = this.starshipRepository.create(createStarshipDto);
    await this.starshipRepository.save(starship);
    return this.findOne(starship.id);
  }

  async findAll(): Promise<Starship[]> {
    return this.starshipRepository.find({
      relations: ['cabins'],
    });
  }

  async findOne(id: number): Promise<Starship> {
    const starship = await this.starshipRepository.findOne({
      where: { id },
      relations: ['cabins'],
    });
    if (!starship) throw new NotFoundException(`Nave con ID ${id} no encontrada`);
    return starship;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
    await this.starshipRepository.update(id, updateStarshipDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.starshipRepository.softDelete(id);
    await this.cabinRepository.softDelete({ starship: { id } });
  }

  async updateStatus(id: number, status: StarshipStatus): Promise<Starship> {
    await this.starshipRepository.update(id, { status });
    return this.findOne(id);
  }
}
