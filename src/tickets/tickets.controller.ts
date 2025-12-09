import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';

@ApiTags('ticket')
@ApiBearerAuth('JWT-auth')
@Controller('ticket')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tickets' })
  @ApiResponse({ status: 200, description: 'Lista de tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('booking/:bookingId')
  @ApiOperation({ summary: 'Obtener tickets de una reserva' })
  @ApiParam({ name: 'bookingId', description: 'ID de la reserva', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de tickets de la reserva' })
  findByBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.ticketsService.findByBooking(bookingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ticket por ID' })
  @ApiParam({ name: 'id', description: 'ID del ticket', type: Number })
  @ApiResponse({ status: 200, description: 'Ticket encontrado' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }
}
