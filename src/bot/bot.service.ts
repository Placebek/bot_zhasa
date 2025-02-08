import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class BotService {
  constructor (
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createBotDto: CreateBotDto) {
    const user = new User({
      ...createBotDto.user,
    })
    const bot = new Bot({
      ...createBotDto,
      user,
    });
    await this.entityManager.save(bot);
    return 'bot create!';
  }

  async findAll() {
    return this.botRepository.find();
  }

  async findOne(id: number) {
    return this.botRepository.findOne({
      where: {id},
      relations: {
        user: true
      }
    });
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
