import { Starship } from 'src/starship/entities/starship.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cabin')
export class Cabin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Starship, starship => starship.cabins, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'starship_id' })
  starship: Starship;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;
}
