import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AtmosphereType } from '../../enums/atmosphere-type.enum';
import { Activity } from 'src/activity/entities/activity.entity';

@Entity('destiny')
export class Destiny {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('simple-array')
  images: string[];

  @Column({ type: 'float' })
  gravity: number;

  @Column({ type: 'varchar', length: 120 })
  system: string;

  @Column({ name: 'day_night_cycle', type: 'int' })
  dayNightCycle: number;

  @Column({
    type: 'enum',
    enum: AtmosphereType,
    default: AtmosphereType.BREATHABLE,
  })
  atmosphere: AtmosphereType;

  @Column({ type: 'bigint' })
  population: number;

  @Column({ name: 'average_temperature', type: 'float' })
  averageTemperature: number;

  @Column({ type: 'float' })
  distance: number;

  @Column({ type: 'json' })
  position: { x: number; y: number };

  @Column({ type: 'int' })
  price: number;

  @Column({
    type: 'json',
    nullable: true,
    default: [],
    name: 'liked_by_users',
  })
  likedByUsers: number[];

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;

  @OneToMany(() => Activity, activity => activity.destiny, { eager: false, cascade: ['insert'] })
  activities: Activity[];
}
