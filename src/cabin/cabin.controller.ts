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
import { CreateCabinStandaloneDto } from './dto/create-cabin-standalone.dto';

@Controller('cabin')
export class CabinController {
  constructor(private readonly cabinService: CabinService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCabinDto: CreateCabinStandaloneDto) {
    return this.cabinService.create(createCabinDto);
  }

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

  @Get('starship/:starshipId')
  @HttpCode(HttpStatus.OK)
  findByStarship(@Param('starshipId', ParseIntPipe) starshipId: number) {
    return this.cabinService.findByStarship(starshipId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinService.update(id, updateCabinDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cabinService.remove(id);
  }
}
