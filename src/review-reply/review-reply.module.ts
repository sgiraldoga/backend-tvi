import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReplyService } from './review-reply.service';
import { ReviewReplyController } from './review-reply.controller';
import { ReviewReply } from './entities/review-reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewReply, User, Review])],
  controllers: [ReviewReplyController],
  providers: [ReviewReplyService],
})
export class ReviewReplyModule {}
