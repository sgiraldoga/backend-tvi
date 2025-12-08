import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterReviewDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El ID del autor debe ser mayor o igual a 1' })
  authorId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El ID del destino debe ser mayor o igual a 1' })
  destinyId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El rating mínimo debe ser mayor o igual a 1' })
  @Max(5, { message: 'El rating mínimo debe ser menor o igual a 5' })
  minRating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El rating máximo debe ser mayor o igual a 1' })
  @Max(5, { message: 'El rating máximo debe ser menor o igual a 5' })
  maxRating?: number;

  // Paginación
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'La página debe ser mayor o igual a 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El límite debe ser mayor o igual a 1' })
  @Max(100, { message: 'El límite máximo es 100' })
  limit?: number = 10;

  // Ordenamiento
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'DESC';
}
