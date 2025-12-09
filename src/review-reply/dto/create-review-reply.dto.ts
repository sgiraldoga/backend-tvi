import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewReplyDto {
  @ApiProperty({
    description: 'ID del usuario autor de la respuesta',
    example: 1,
    minimum: 1,
  })
  @IsInt({ message: 'El ID del autor debe ser un número entero' })
  @IsPositive({ message: 'El ID del autor debe ser positivo' })
  @IsNotEmpty({ message: 'El ID del autor es requerido' })
  authorId: number;

  @ApiProperty({
    description: 'ID de la reseña que se está respondiendo',
    example: 1,
    minimum: 1,
  })
  @IsInt({ message: 'El ID de la reseña debe ser un número entero' })
  @IsPositive({ message: 'El ID de la reseña debe ser positivo' })
  @IsNotEmpty({ message: 'El ID de la reseña es requerido' })
  reviewId: number;

  @ApiProperty({
    description: 'Contenido de la respuesta',
    example: 'Gracias por tu comentario. Nos alegra que hayas disfrutado la experiencia.',
  })
  @IsString({ message: 'El contenido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El contenido es requerido' })
  content: string;
}
