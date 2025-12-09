import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('booking')
@ApiBearerAuth('JWT-auth')
@Controller('booking')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o capacidad insuficiente' })
  @ApiResponse({ status: 404, description: 'Usuario, destino o cabina no encontrado' })
  @ApiResponse({ status: 409, description: 'Nave no disponible para el destino en las fechas' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({ status: 200, description: 'Lista de reservas' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get('available-starships')
  @ApiOperation({ summary: 'Obtener naves disponibles para un destino y fechas' })
  @ApiQuery({ name: 'destinyId', type: Number, description: 'ID del destino' })
  @ApiQuery({ name: 'departureDate', type: String, description: 'Fecha de salida (YYYY-MM-DD)' })
  @ApiQuery({ name: 'returnDate', type: String, description: 'Fecha de regreso (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Lista de naves disponibles con capacidad' })
  getAvailableStarships(
    @Query('destinyId', ParseIntPipe) destinyId: number,
    @Query('departureDate') departureDate: string,
    @Query('returnDate') returnDate: string,
  ) {
    return this.booksService.getAvailableStarships(destinyId, departureDate, returnDate);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener reservas de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de reservas del usuario' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.booksService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reserva', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estado de una reserva' })
  @ApiParam({ name: 'id', description: 'ID de la reserva', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva actualizada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar una reserva' })
  @ApiParam({ name: 'id', description: 'ID de la reserva', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva cancelada' })
  @ApiResponse({ status: 400, description: 'La reserva ya está cancelada o completada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.cancel(id);
  }
}
