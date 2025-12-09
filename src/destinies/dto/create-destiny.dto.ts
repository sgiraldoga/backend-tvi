import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsUrl,
  IsNumberString,
  IsPositive,
  IsInt,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AtmosphereType } from '../../enums/atmosphere-type.enum';
import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';

class PositionDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

export class CreateDestinyDto {
  @ApiProperty({
    description: 'Nombre del destino',
    example: 'Marte',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del destino',
    example: 'El planeta rojo, cuarto planeta del sistema solar',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({
    description: 'URLs de las imágenes del destino',
    example: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9'],
    type: [String],
  })
  @IsArray({ message: 'Las imágenes deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos una imagen' })
  @IsUrl({}, { each: true, message: 'Cada imagen debe ser una URL válida' })
  @IsNotEmpty({ message: 'Las imágenes son requeridas' })
  images: string[];

  @ApiProperty({
    description: 'Gravedad en m/s²',
    example: 3.72,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive({ message: 'La gravedad debe ser un número positivo' })
  @IsNotEmpty({ message: 'La gravedad es requerida' })
  gravity: number;

  @ApiProperty({
    description: 'Sistema estelar donde se encuentra el destino',
    example: 'Sistema Solar',
  })
  @IsString({ message: 'El sistema debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El sistema es requerido' })
  system: string;

  @ApiProperty({
    description: 'Duración del ciclo día/noche en horas',
    example: 25,
    minimum: 1,
  })
  @IsInt({ message: 'El ciclo diurno debe ser un número entero' })
  @IsPositive({ message: 'El ciclo diurno debe ser un número positivo' })
  @IsNotEmpty({ message: 'El ciclo diurno es requerido' })
  dayNightCycle: number;

  @ApiProperty({
    description: 'Tipo de atmósfera',
    enum: AtmosphereType,
    example: AtmosphereType.NOT_BREATHABLE,
  })
  @IsEnum(AtmosphereType, {
    message: 'La atmosfera debe ser respirable, no respirable, tóxica o nula',
  })
  @IsNotEmpty({ message: 'La atmosfera es requerida' })
  atmosphere: AtmosphereType;

  @ApiProperty({
    description: 'Población del destino',
    example: '2500000',
  })
  @IsString({ message: 'La población debe ser una cadena de texto' })
  @IsNumberString()
  @IsNotEmpty({ message: 'La población es requerida' })
  population: string;

  @ApiProperty({
    description: 'Temperatura promedio en grados Celsius',
    example: -63,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'La temperatura promedio es requerida' })
  averageTemperature: number;

  @ApiProperty({
    description: 'Distancia desde la Tierra en millones de km',
    example: 225.0,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive({ message: 'La distancia debe ser un número positivo' })
  @IsNotEmpty({ message: 'La distancia es requerida' })
  distance: number;

  @ApiProperty({
    description: 'Posición en el mapa galáctico',
    example: { x: 100, y: 200 },
  })
  @IsObject({ message: 'La posición debe ser un objeto' })
  @ValidateNested()
  @Type(() => PositionDto)
  @IsNotEmpty({ message: 'La posición es requerida' })
  position: { x: number; y: number };

  @ApiProperty({
    description: 'Precio del viaje en créditos',
    example: 50000,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  activities: CreateActivityDto[];
}
