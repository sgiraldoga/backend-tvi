import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { StarshipStatus } from 'src/enums/starship-status.enum';

export class CreateStarshipDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La clase es requerida' })
  class: string;

  @IsNotEmpty({ message: 'La capacidad es requerida' })
  capacity: number;

  @IsNotEmpty({ message: 'La velocidad es requerida' })
  speed: number;

  @IsNotEmpty({ message: 'El estado es requerido' })
  status: StarshipStatus;

  @IsNotEmpty({ message: 'Las comodidades son requeridas' })
  amenities: string[];
}
