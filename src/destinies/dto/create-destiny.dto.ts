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
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsString({ message: 'La imagen debe ser una URL' })
  @IsUrl()
  @IsNotEmpty({ message: 'La imagen es requerida' })
  image: string;

  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number;

  @IsString({ message: 'El sistema debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El sistema es requerido' })
  system: string;

  @IsNumber()
  @IsPositive({ message: 'La gravedad debe ser un número positivo' })
  @IsNotEmpty({ message: 'La gravedad es requerida' })
  gravity: number;

  @IsEnum(AtmosphereType, {
    message: 'La atmosfera debe ser respirable, no respirable, tóxica o nula',
  })
  @IsNotEmpty({ message: 'La atmosfera es requerida' })
  atmosphere: AtmosphereType;

  @IsInt({ message: 'El ciclo diurno debe ser un número entero' })
  @IsPositive({ message: 'El ciclo diurno debe ser un número positivo' })
  @IsNotEmpty({ message: 'El ciclo diurno es requerido' })
  dayNightCycle: number;

  @IsString({ message: 'La población debe ser una cadena de texto' })
  @IsNumberString()
  @IsNotEmpty({ message: 'La población es requerida' })
  population: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La temperatura promedio es requerida' })
  averageTemperature: number;

  @IsNumber()
  @IsPositive({ message: 'La distancia debe ser un número positivo' })
  @IsNotEmpty({ message: 'La distancia es requerida' })
  distance: number;
}
