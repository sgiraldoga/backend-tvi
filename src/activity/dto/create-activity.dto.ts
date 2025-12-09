import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ActivityCategory } from 'src/enums/activity-category.enum';
import { ActivityDifficulty } from 'src/enums/activity-difficulty.enum';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsEnum(ActivityDifficulty, { message: 'La dificultad debe ser easy, medium o hard' })
  difficulty: ActivityDifficulty;

  @IsString()
  @IsNotEmpty({ message: 'La duración es requerida' })
  duration: string;

  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsEnum(ActivityCategory, {
    message: 'La categoría debe ser una de estas: mountain, water, air, forest, desert',
  })
  category: ActivityCategory;

  @IsString()
  @IsNotEmpty({ message: 'La imagen es requerida' })
  image: string;
}
