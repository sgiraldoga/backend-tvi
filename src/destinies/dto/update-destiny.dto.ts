import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinyDto } from './create-destiny.dto';

export class UpdateDestinyDto extends PartialType(CreateDestinyDto) {}
