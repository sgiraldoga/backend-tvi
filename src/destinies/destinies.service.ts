import { Injectable } from '@nestjs/common';
import { CreateDestinyDto } from './dto/create-destiny.dto';
import { UpdateDestinyDto } from './dto/update-destiny.dto';

@Injectable()
export class DestiniesService {
  create(createDestinyDto: CreateDestinyDto) {
    return 'This action adds a new destiny';
  }

  findAll() {
    return `This action returns all destinies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} destiny`;
  }

  update(id: number, updateDestinyDto: UpdateDestinyDto) {
    return `This action updates a #${id} destiny`;
  }

  remove(id: number) {
    return `This action removes a #${id} destiny`;
  }
}
