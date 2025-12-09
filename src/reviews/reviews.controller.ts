import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('review')
@ApiBearerAuth('JWT-auth')
@Controller('review')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Autor o destino no encontrado' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Public()
  @Get('destiny/:destinyId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las reseñas de un destino' })
  @ApiParam({ name: 'destinyId', description: 'ID del destino', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de reseñas obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Destino no encontrado' })
  findByDestiny(@Param('destinyId', ParseIntPipe) destinyId: number) {
    return this.reviewsService.findByDestiny(destinyId);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una reseña por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reseña', type: Number })
  @ApiResponse({ status: 200, description: 'Reseña encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Post('like/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Dar like a una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña', type: Number })
  @ApiResponse({ status: 200, description: 'Like agregado exitosamente' })
  @ApiResponse({ status: 400, description: 'Ya has dado like a esta reseña' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  addLike(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') userId: number) {
    return this.reviewsService.addLike(id, userId);
  }

  @Delete('like/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Quitar like de una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña', type: Number })
  @ApiResponse({ status: 200, description: 'Like removido exitosamente' })
  @ApiResponse({ status: 400, description: 'No has dado like a esta reseña' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  removeLike(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') userId: number) {
    return this.reviewsService.removeLike(id, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña a eliminar', type: Number })
  @ApiResponse({ status: 204, description: 'Reseña eliminada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }
}
