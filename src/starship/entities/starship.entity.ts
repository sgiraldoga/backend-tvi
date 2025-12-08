import { StarshipStatus } from 'src/enums/starship-status.enum';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('starship')
export class Starship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  class: string;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'enum', enum: StarshipStatus, default: StarshipStatus.ACTIVE })
  status: StarshipStatus;

  @Column('simple-array')
  amenities: string[];

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;
}
