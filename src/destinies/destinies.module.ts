import { Module } from '@nestjs/common';
import { DestiniesService } from './destinies.service';
import { DestiniesController } from './destinies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destiny } from './entities/destiny.entity';
import { Activity } from 'src/activity/entities/activity.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destiny, Activity, Review])],
  controllers: [DestiniesController],
  providers: [DestiniesService],
})
export class DestiniesModule {}
