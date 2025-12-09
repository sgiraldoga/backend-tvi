import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Destiny } from 'src/destinies/entities/destiny.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    @InjectRepository(Destiny)
    private readonly destinyRepository: Repository<Destiny>,
  ) {}

  async create(destinyId: number, createActivityDto: CreateActivityDto): Promise<Activity> {
    const destiny = await this.destinyRepository.findOne({
      where: { id: destinyId },
    });

    if (!destiny) {
      throw new NotFoundException(`Destino con ID ${destinyId} no encontrado`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      destiny,
    });
    await this.activityRepository.save(activity);
    return this.findOne(activity.id);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    if (!id || id <= 0) throw new BadRequestException('ID inválido');
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    return activity;
  }

  async findByDestiny(destinyId: number): Promise<Activity[]> {
    const destiny = await this.destinyRepository.findOne({ where: { id: destinyId } });
    if (!destiny) throw new NotFoundException(`Destino con ID ${destinyId} no encontrado`);
    return this.activityRepository.find({ where: { destiny: { id: destinyId } } });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    await this.findOne(id);
    await this.activityRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.activityRepository.remove(activity);
  }
}
