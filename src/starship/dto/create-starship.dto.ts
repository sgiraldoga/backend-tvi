import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateCabinDto } from 'src/cabin/dto/create-cabin.dto';
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

  @IsNotEmpty({ message: 'El estado es requerido' })
  status: StarshipStatus;

  @IsNotEmpty({ message: 'Las comodidades son requeridas' })
  amenities: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCabinDto)
  cabins: CreateCabinDto[];
}
