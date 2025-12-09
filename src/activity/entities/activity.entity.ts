import { Destiny } from 'src/destinies/entities/destiny.entity';
import { ActivityCategory } from 'src/enums/activity-category.enum';
import { ActivityDifficulty } from 'src/enums/activity-difficulty.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Destiny, destiny => destiny.activities, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destiny_id' })
  destiny: Destiny;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ActivityDifficulty, default: ActivityDifficulty.EASY })
  difficulty: ActivityDifficulty;

  @Column({ type: 'varchar', length: 100 })
  duration: string;

  @Column({ type: 'enum', enum: ActivityCategory })
  category: ActivityCategory;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;
}
