import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../database/entities/user.entity'; 
import { Bot } from '../database/entities/bot.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserBotService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
  ) {}

  public async getUserByID(userID: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async isUserBot(userID: number, botID: number): Promise<Bot | null> {
    const user = await this.getUserByID(userID);
    const bot = await this.botRepository.findOne({
      where: { id: botID },
      relations: { user: true },
    });

    if (bot && bot.user.id === user.id) {
      return bot;
    }

    return null;
  }
}