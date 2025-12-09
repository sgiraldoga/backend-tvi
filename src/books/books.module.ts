import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { User } from '../user/entities/user.entity';
import { Destiny } from '../destinies/entities/destiny.entity';
import { Cabin } from '../cabin/entities/cabin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Ticket, User, Destiny, Cabin])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
