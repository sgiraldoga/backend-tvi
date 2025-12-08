import { IsEnum } from 'class-validator';
import { StarshipStatus } from 'src/enums/starship-status.enum';

export class UpdateStarshipStatusDto {
  @IsEnum(StarshipStatus, {
    message: 'El estado debe ser: active, maintenance o unavailable',
  })
  status: StarshipStatus;
}
