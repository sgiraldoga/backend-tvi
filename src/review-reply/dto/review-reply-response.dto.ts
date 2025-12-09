import { User } from 'src/user/entities/user.entity';

export class ReviewReplyResponseDto {
  id: number;
  author: User;
  reviewId: number;
  content: string;
  createdAt: Date;
}
