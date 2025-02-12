import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeleConstructorsService } from './tele-constructors.service';
import { CreateTeleConstructorDto } from './dto/create-tele-constructor.dto';
import { UpdateTeleConstructorDto } from './dto/update-tele-constructor.dto';

@Controller('tele-constructors')
export class TeleConstructorsController {
  constructor(private readonly teleConstructorsService: TeleConstructorsService) {}

  @Post()
  create(@Body() createTeleConstructorDto: CreateTeleConstructorDto) {
    return this.teleConstructorsService.create(createTeleConstructorDto);
  }

  @Get()
  findAll() {
    return this.teleConstructorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teleConstructorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeleConstructorDto: UpdateTeleConstructorDto) {
    return this.teleConstructorsService.update(+id, updateTeleConstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teleConstructorsService.remove(+id);
  }
}
