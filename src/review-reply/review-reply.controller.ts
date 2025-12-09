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
import { ReviewReplyService } from './review-reply.service';
import { CreateReviewReplyDto } from './dto/create-review-reply.dto';

@ApiTags('review-reply')
@ApiBearerAuth('JWT-auth')
@Controller('review-reply')
export class ReviewReplyController {
  constructor(private readonly reviewReplyService: ReviewReplyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva respuesta a una reseña' })
  @ApiResponse({ status: 201, description: 'Respuesta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Autor o reseña no encontrada' })
  create(@Body() createReviewReplyDto: CreateReviewReplyDto) {
    return this.reviewReplyService.create(createReviewReplyDto);
  }

  @Get('review/:reviewId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las respuestas de una reseña' })
  @ApiParam({ name: 'reviewId', description: 'ID de la reseña', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de respuestas obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  findByReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewReplyService.findByReview(reviewId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una respuesta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la respuesta', type: Number })
  @ApiResponse({ status: 200, description: 'Respuesta encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Respuesta no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewReplyService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una respuesta' })
  @ApiParam({ name: 'id', description: 'ID de la respuesta a eliminar', type: Number })
  @ApiResponse({ status: 204, description: 'Respuesta eliminada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Respuesta no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewReplyService.remove(id);
  }
}
