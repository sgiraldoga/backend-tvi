import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
