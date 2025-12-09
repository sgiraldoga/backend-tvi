import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Destiny } from '../destinies/entities/destiny.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Destiny])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
