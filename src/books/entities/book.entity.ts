import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Destiny } from '../../destinies/entities/destiny.entity';
import { Cabin } from '../../cabin/entities/cabin.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { BookingStatus } from '../../enums/booking-status.enum';

@Entity('booking')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Destiny, { eager: false })
  @JoinColumn({ name: 'destiny_id' })
  destiny: Destiny;

  @ManyToOne(() => Cabin, { eager: false })
  @JoinColumn({ name: 'cabin_id' })
  cabin: Cabin;

  @Column({ name: 'departure_date', type: 'date' })
  departureDate: Date;

  @Column({ name: 'return_date', type: 'date' })
  returnDate: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.CONFIRMED,
  })
  status: BookingStatus;

  @Column({ name: 'ticket_count', type: 'int' })
  ticketCount: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Ticket, ticket => ticket.booking, { cascade: ['insert'] })
  tickets: Ticket[];
}
