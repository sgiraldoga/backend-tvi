import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterReviewDto {
  @ApiPropertyOptional({
    description: 'Filtrar por ID del autor',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El ID del autor debe ser mayor o igual a 1' })
  authorId?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por ID del destino',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El ID del destino debe ser mayor o igual a 1' })
  destinyId?: number;

  @ApiPropertyOptional({
    description: 'Rating mínimo (1-5)',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El rating mínimo debe ser mayor o igual a 1' })
  @Max(5, { message: 'El rating mínimo debe ser menor o igual a 5' })
  minRating?: number;

  @ApiPropertyOptional({
    description: 'Rating máximo (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El rating máximo debe ser mayor o igual a 1' })
  @Max(5, { message: 'El rating máximo debe ser menor o igual a 5' })
  maxRating?: number;

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
    description: 'Dirección del ordenamiento por fecha',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'DESC';
}
