import { Destiny } from 'src/destinies/entities/destiny.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Destiny, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destiny_id' })
  destiny: Destiny;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  @Check(`"rating" >= 1 AND "rating" <= 5`)
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'json',
    nullable: true,
    default: [],
    name: 'liked_by_users',
  })
  likedByUsers: number[];
}
