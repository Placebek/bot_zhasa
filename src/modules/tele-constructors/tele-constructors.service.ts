import { Injectable } from '@nestjs/common';
import { CreateTeleConstructorDto } from './dto/create-tele-constructor.dto';
import { UpdateTeleConstructorDto } from './dto/update-tele-constructor.dto';

@Injectable()
export class TeleConstructorsService {
  create(createTeleConstructorDto: CreateTeleConstructorDto) {
    return 'This action adds a new teleConstructor';
  }

  findAll() {
    return `This action returns all teleConstructors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teleConstructor`;
  }

  update(id: number, updateTeleConstructorDto: UpdateTeleConstructorDto) {
    return `This action updates a #${id} teleConstructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} teleConstructor`;
  }
}
