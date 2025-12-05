import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsUrl,
  IsNumberString,
  IsPositive,
  IsInt,
} from 'class-validator';
import { AtmosphereType } from '../enums/atmosphere-type.enum';

export class CreateDestinyDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty({ message: 'La imagen es requerida' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'El sistema es requerido' })
  system: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'La gravedad es requerida' })
  gravity: number;

  @IsEnum(AtmosphereType, {
    message: 'La atmosfera debe ser respirable, no respirable, tóxica o nula',
  })
  @IsNotEmpty({ message: 'La atmosfera es requerida' })
  atmosphere: AtmosphereType;

  @IsInt()
  @IsPositive()
  @IsNotEmpty({ message: 'El ciclo diurno es requerido' })
  dayNightCycle: number;

  @IsString()
  @IsNumberString()
  @IsNotEmpty({ message: 'La población es requerida' })
  population: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La temperatura promedio es requerida' })
  averageTemperature: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'La distancia es requerida' })
  distance: number;
}
