import {
  IsInt,
  IsPositive,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PassengerDto {
  @ApiProperty({
    description: 'Nombre del pasajero',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del pasajero es requerido' })
  name: string;
}

export class CreateBookDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la reserva',
    example: 1,
  })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @IsPositive({ message: 'El ID del usuario debe ser positivo' })
  userId: number;

  @ApiProperty({
    description: 'ID del destino',
    example: 1,
  })
  @IsInt({ message: 'El ID del destino debe ser un número entero' })
  @IsPositive({ message: 'El ID del destino debe ser positivo' })
  destinyId: number;

  @ApiProperty({
    description: 'ID de la cabina seleccionada',
    example: 1,
  })
  @IsInt({ message: 'El ID de la cabina debe ser un número entero' })
  @IsPositive({ message: 'El ID de la cabina debe ser positivo' })
  cabinId: number;

  @ApiProperty({
    description: 'Fecha de salida (YYYY-MM-DD)',
    example: '2025-06-15',
  })
  @IsDateString({}, { message: 'La fecha de salida debe ser una fecha válida' })
  departureDate: string;

  @ApiProperty({
    description: 'Fecha de regreso (YYYY-MM-DD)',
    example: '2025-06-30',
  })
  @IsDateString({}, { message: 'La fecha de regreso debe ser una fecha válida' })
  returnDate: string;

  @ApiProperty({
    description: 'Lista de pasajeros',
    type: [PassengerDto],
    example: [{ name: 'Juan Pérez' }, { name: 'María García' }],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe haber al menos un pasajero' })
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  passengers: PassengerDto[];
}
