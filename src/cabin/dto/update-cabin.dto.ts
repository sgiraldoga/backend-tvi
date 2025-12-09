import { PartialType } from '@nestjs/swagger';
import { CreateCabinDto } from './create-cabin.dto';

export class UpdateCabinDto extends PartialType(CreateCabinDto) {}
