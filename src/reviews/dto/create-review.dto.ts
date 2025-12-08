import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt({ message: 'El ID del autor debe ser un número entero' })
  @IsPositive({ message: 'El ID del autor debe ser positivo' })
  @IsNotEmpty({ message: 'El ID del autor es requerido' })
  authorId: number;

  @IsInt({ message: 'El ID del destino debe ser un número entero' })
  @IsPositive({ message: 'El ID del destino debe ser positivo' })
  @IsNotEmpty({ message: 'El ID del destino es requerido' })
  destinyId: number;

  @IsString()
  @IsNotEmpty({ message: 'El contenido es requerido' })
  content: string;

  @IsNumber()
  @Max(5, { message: 'La calificación debe ser entre 1 y 5' })
  @Min(1, { message: 'La calificación debe ser entre 1 y 5' })
  @IsNotEmpty({ message: 'La calificación es requerida' })
  rating: number;
}
