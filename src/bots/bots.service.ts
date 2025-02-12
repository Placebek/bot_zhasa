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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUserBot( userID, createBotDto: CreateBotDto) {
    const user = await this.getUserByID(userID);
    const bot = new Bot({
      ...createBotDto,
      user: user,
    });
    await this.entityManager.save(bot);
    return 'bot create!';
  }

  async getAllBots() {
    return this.botRepository.find();
  }

  async findBotByID(id: number) {
    return this.botRepository.findOne({
      where: {id},
    });
  }

  async updateBotActive(userID, id: number) {
    const bot = await this.isUserBot(userID, id);
    if (bot) {
      bot.isActive = !(bot.isActive);
      await this.entityManager.save(bot);
      return `This action updates a #${id} bot`;
    }
    return `This action not updates a #${id} bot`;
  }

  async removeBotByID(userID, id: number) {
    const bot = await this.isUserBot(userID, id);

    if (bot) {
      await this.botRepository.delete(id)
      return `This action removes a #${id} bot`;
    }
    return `Not delete`;
  }

  async isUserBot (userID, botID) {
    const user = await this.getUserByID(userID);
    const bot = await this.botRepository.findOne({
      where: {id: botID},
      relations: {user: true}
    });

    if (bot) {
      if (bot.user.id === user.id) {
        return bot;
      }
    }
  }

  async getUserByID(userID) {
    const user = await this.userRepository.findOne({
      where: {id: userID},
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
