import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CabinService } from './cabin.service';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('cabin')
export class CabinController {
  constructor(private readonly cabinService: CabinService) {}

  @Roles('admin')
  @Post(':starshipId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('starshipId', ParseIntPipe) starshipId: number,
    @Body() createCabinDto: CreateCabinDto,
  ) {
    return this.cabinService.create(starshipId, createCabinDto);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.cabinService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cabinService.findOne(id);
  }

  @Public()
  @Get('starship/:starshipId')
  @HttpCode(HttpStatus.OK)
  findByStarship(@Param('starshipId', ParseIntPipe) starshipId: number) {
    return this.cabinService.findByStarship(starshipId);
  }

  @Roles('admin')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinService.update(id, updateCabinDto);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cabinService.remove(id);
  }
}
