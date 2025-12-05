import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.destiniesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestinyDto: UpdateDestinyDto) {
    return this.destiniesService.update(+id, updateDestinyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destiniesService.remove(+id);
  }
}
