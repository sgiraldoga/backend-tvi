import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabinService } from './cabin.service';
import { CabinController } from './cabin.controller';
import { Cabin } from './entities/cabin.entity';
import { Starship } from 'src/starship/entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cabin, Starship])],
  controllers: [CabinController],
  providers: [CabinService],
  exports: [CabinService],
})
export class CabinModule {}
