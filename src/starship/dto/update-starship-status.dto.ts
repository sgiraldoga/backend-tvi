import { IsEnum } from 'class-validator';
import { StatusEnum } from 'src/enums/starship-status.enum';

export class UpdateStarshipStatusDto {
  @IsEnum(StatusEnum, {
    message: 'El estado debe ser: active, maintenance o unavailable',
  })
  status: StatusEnum;
}
