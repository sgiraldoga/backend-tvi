import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AtmosphereType } from '../enums/atmosphere-type.enum';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('destinies')
export class Destiny {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  system: string;

  @Column({ type: 'float' })
  gravity: number;

  @Column({
    type: 'enum',
    enum: AtmosphereType,
    default: AtmosphereType.BREATHABLE,
  })
  atmosphere: AtmosphereType;

  @Column({ name: 'day_night_cycle', type: 'int' })
  dayNightCycle: number;

  @Column({ type: 'bigint' })
  population: string;

  @Column({ name: 'average_temperature' })
  averageTemperature: number;

  @Column({ type: 'float' })
  distance: number;

  @OneToMany(() => Review, review => review.destiny)
  reviews: Review[];
}
