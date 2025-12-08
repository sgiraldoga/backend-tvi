import { Destiny } from 'src/destinies/entities/destiny.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Destiny, destiny => destiny.reviews)
  @JoinColumn({ name: 'destiny_id' })
  destiny: Destiny;

  @Column()
  content: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
