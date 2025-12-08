import { Module } from '@nestjs/common';
import { DestiniesService } from './destinies.service';
import { DestiniesController } from './destinies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destiny } from './entities/destiny.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destiny])],
  controllers: [DestiniesController],
  providers: [DestiniesService],
})
export class DestiniesModule {}
