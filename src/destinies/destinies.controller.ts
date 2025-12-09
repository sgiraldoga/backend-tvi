import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DestiniesService } from './destinies.service';
import { CreateDestinyDto } from './dto/create-destiny.dto';
import { UpdateDestinyDto } from './dto/update-destiny.dto';
import { FilterDestinyDto } from './dto/filter-destiny.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('destiny')
@ApiBearerAuth('JWT-auth')
@Controller('destiny')
export class DestiniesController {
  constructor(private readonly destiniesService: DestiniesService) {}

  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo destino' })
  @ApiResponse({ status: 201, description: 'Destino creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'El destino ya existe' })
  create(@Body() createDestinyDto: CreateDestinyDto) {
    return this.destiniesService.create(createDestinyDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los destinos con filtros y paginación' })
  @ApiResponse({ status: 200, description: 'Lista de destinos obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query() filters: FilterDestinyDto) {
    return this.destiniesService.findAll(filters);
  }

  @Public()
  @Get('reviews-summary/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener resumen de reseñas de un destino' })
  @ApiParam({ name: 'id', description: 'ID del destino', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Resumen de reseñas obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        averageRating: { type: 'number', example: 4.35 },
        totalReviews: { type: 'number', example: 150 },
        rating1: { type: 'number', example: 5 },
        rating2: { type: 'number', example: 10 },
        rating3: { type: 'number', example: 15 },
        rating4: { type: 'number', example: 50 },
        rating5: { type: 'number', example: 70 },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Destino no encontrado' })
  getReviewsSummary(@Param('id', ParseIntPipe) id: number) {
    return this.destiniesService.getReviewsSummary(id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un destino por ID' })
  @ApiParam({ name: 'id', description: 'ID del destino', type: Number })
  @ApiResponse({ status: 200, description: 'Destino encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Destino no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.destiniesService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un destino' })
  @ApiParam({ name: 'id', description: 'ID del destino a actualizar', type: Number })
  @ApiResponse({ status: 200, description: 'Destino actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Destino no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDestinyDto: UpdateDestinyDto) {
    return this.destiniesService.update(id, updateDestinyDto);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un destino' })
  @ApiParam({ name: 'id', description: 'ID del destino a eliminar', type: Number })
  @ApiResponse({ status: 204, description: 'Destino eliminado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Destino no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.destiniesService.remove(id);
  }
}
