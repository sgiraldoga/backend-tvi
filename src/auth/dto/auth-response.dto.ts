import { User } from 'src/user/entities/user.entity';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}
