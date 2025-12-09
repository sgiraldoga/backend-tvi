import { User } from 'src/user/entities/user.entity';

export class ReviewResponseDto {
  id: number;
  author: User;
  destinyId: number;
  content: string;
  rating: number;
  createdAt: Date;
  likedByUsers: number[];
}
