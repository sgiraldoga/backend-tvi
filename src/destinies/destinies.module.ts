import { Module } from '@nestjs/common';
import { DestiniesService } from './destinies.service';
import { DestiniesController } from './destinies.controller';

@Module({
  controllers: [DestiniesController],
  providers: [DestiniesService],
})
export class DestiniesModule {}
