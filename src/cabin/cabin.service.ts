import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCabinStandaloneDto } from './dto/create-cabin-standalone.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { Cabin } from './entities/cabin.entity';
import { Starship } from 'src/starship/entities/starship.entity';

@Injectable()
export class CabinService {
  constructor(
    @InjectRepository(Cabin)
    private readonly cabinRepository: Repository<Cabin>,

    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  async create(createCabinDto: CreateCabinStandaloneDto): Promise<Cabin> {
    const { starshipId, ...cabinData } = createCabinDto;

    const starship = await this.starshipRepository.findOne({
      where: { id: starshipId },
    });

    if (!starship) {
      throw new NotFoundException(`Nave con ID ${starshipId} no encontrada`);
    }

    const cabin = this.cabinRepository.create({
      ...cabinData,
      starship,
    });
    await this.cabinRepository.save(cabin);
    return this.findOne(cabin.id);
  }

  async findAll(): Promise<Cabin[]> {
    return this.cabinRepository.find();
  }

  async findOne(id: number): Promise<Cabin> {
    if (!id || id <= 0) throw new BadRequestException('ID inválido');
    const cabin = await this.cabinRepository.findOne({ where: { id } });
    if (!cabin) throw new NotFoundException(`Cabina con ID ${id} no encontrada`);
    return cabin;
  }

  async findByStarship(starshipId: number): Promise<Cabin[]> {
    const starship = await this.starshipRepository.findOne({ where: { id: starshipId } });
    if (!starship) throw new NotFoundException(`Nave con ID ${starshipId} no encontrada`);
    return this.cabinRepository.find({ where: { starship: { id: starshipId } } });
  }

  async update(id: number, updateCabinDto: UpdateCabinDto): Promise<Cabin> {
    await this.findOne(id);
    await this.cabinRepository.update(id, updateCabinDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cabin = await this.findOne(id);
    await this.cabinRepository.remove(cabin);
  }
}
