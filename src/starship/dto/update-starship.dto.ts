import { PartialType } from '@nestjs/mapped-types';
import { CreateStarshipDto } from './create-starship.dto';

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}
