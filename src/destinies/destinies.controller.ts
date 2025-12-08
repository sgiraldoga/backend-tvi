import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DestiniesService } from './destinies.service';
import { CreateDestinyDto } from './dto/create-destiny.dto';
import { UpdateDestinyDto } from './dto/update-destiny.dto';

@Controller('destinies')
export class DestiniesController {
  constructor(private readonly destiniesService: DestiniesService) {}

  @Post()
  create(@Body() createDestinyDto: CreateDestinyDto) {
    return this.destiniesService.create(createDestinyDto);
  }

  @Get()
  findAll() {
    return this.destiniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.destiniesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDestinyDto: UpdateDestinyDto) {
    return this.destiniesService.update(id, updateDestinyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.destiniesService.remove(id);
  }
}
