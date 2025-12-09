import { IsOptional, IsString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AtmosphereType } from '../../enums/atmosphere-type.enum';

export class FilterDestinyDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre (búsqueda parcial)',
    example: 'marte',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por sistema estelar (búsqueda parcial)',
    example: 'solar',
  })
  @IsOptional()
  @IsString()
  system?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo de atmósfera',
    enum: AtmosphereType,
  })
  @IsOptional()
  @IsEnum(AtmosphereType, {
    message: 'La atmósfera debe ser: breathable, not breathable, toxic o none',
  })
  atmosphere?: AtmosphereType;

  @ApiPropertyOptional({
    description: 'Precio mínimo',
    example: 10000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'El precio mínimo debe ser mayor o igual a 0' })
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Precio máximo',
    example: 100000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Distancia mínima en millones de km',
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minDistance?: number;

  @ApiPropertyOptional({
    description: 'Distancia máxima en millones de km',
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDistance?: number;

  @ApiPropertyOptional({
    description: 'Temperatura mínima en °C',
    example: -100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minTemperature?: number;

  @ApiPropertyOptional({
    description: 'Temperatura máxima en °C',
    example: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxTemperature?: number;

  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'La página debe ser mayor o igual a 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de resultados por página',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El límite debe ser mayor o igual a 1' })
  @Max(100, { message: 'El límite máximo es 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    enum: ['name', 'price', 'distance', 'averageTemperature'],
    default: 'name',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'price' | 'distance' | 'averageTemperature' = 'name';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'ASC';
}
