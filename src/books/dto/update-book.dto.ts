import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '../../enums/booking-status.enum';

export class UpdateBookDto {
  @ApiPropertyOptional({
    description: 'Estado de la reserva',
    enum: BookingStatus,
    example: BookingStatus.CANCELLED,
  })
  @IsOptional()
  @IsEnum(BookingStatus, { message: 'Estado inválido' })
  status?: BookingStatus;
}
