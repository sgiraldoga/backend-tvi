import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateCabinDto } from './create-cabin.dto';

export class CreateCabinStandaloneDto extends CreateCabinDto {
  @IsNumber({}, { message: 'El ID de la nave debe ser un número' })
  @IsPositive({ message: 'El ID de la nave debe ser positivo' })
  @IsNotEmpty({ message: 'El ID de la nave es requerido' })
  starshipId: number;
}
