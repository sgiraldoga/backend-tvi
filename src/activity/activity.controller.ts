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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Roles('admin')
  @Post(':destinyId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('destinyId', ParseIntPipe) destinyId: number,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return this.activityService.create(destinyId, createActivityDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.findOne(id);
  }

  @Get('destiny/:destinyId')
  @HttpCode(HttpStatus.OK)
  findByDestiny(@Param('destinyId', ParseIntPipe) destinyId: number) {
    return this.activityService.findByDestiny(destinyId);
  }

  @Roles('admin')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.remove(id);
  }
}
