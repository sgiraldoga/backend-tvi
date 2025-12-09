import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Cabin } from 'src/cabin/entities/cabin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starship, Cabin])],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
