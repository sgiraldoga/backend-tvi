import { IsOptional, IsString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { AtmosphereType } from '../enums/atmosphere-type.enum';

export class FilterDestinyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  system?: string;

  @IsOptional()
  @IsEnum(AtmosphereType, {
    message: 'La atmósfera debe ser: breathable, not breathable, toxic o none',
  })
  atmosphere?: AtmosphereType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'El precio mínimo debe ser mayor o igual a 0' })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minDistance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDistance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minTemperature?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxTemperature?: number;

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
  @IsString()
  sortBy?: 'name' | 'price' | 'distance' | 'averageTemperature' = 'name';

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'ASC';
}
