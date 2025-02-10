import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from '../database/entities/bot.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class BotsService {
  constructor (
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    private jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  async createUserBot( userID, createBotDto: CreateBotDto) {
    const user = this.botRepository.findOne({
      where: {id: userID}
    });

    // const bot = new Bot({
    //   ...createBotDto,
    //   user
    // });
    // await this.entityManager.save(bot);
    // return 'bot create!';
  }

  async getAllBots() {
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
