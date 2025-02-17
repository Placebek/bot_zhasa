import { ExecutionContext, Injectable, Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BotDataDto, CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from '../../database/entities/bot.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ApiConfigService } from 'src/config/api-config.service';
import { UserBotService } from 'src/common/common.service';


@Injectable()
export class BotsService {
  private authHeader: string;
  private apiURL: string;

  constructor (
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    @InjectRepository(User)
    private readonly entityManager: EntityManager,
    private readonly httpService: HttpService,
    private readonly apiConfigService: ApiConfigService,
    private readonly userBotService: UserBotService,
  ) {
    this.authHeader = this.apiConfigService.authHeader;
    this.apiURL = this.apiConfigService.apiURL;
  }

  async createUserBot( userID, createBotDto: CreateBotDto) {
    const user = await this.userBotService.getUserByID(userID);
    const bot = this.botRepository.create({
      ...createBotDto,
      user: user,
    });

    await this.botRepository.save(bot);
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.apiURL}/tokens`,
          {
            telegram_id: String(user.id),
            token: bot.token,
          },
          {
            headers: {
              Authorization: this.authHeader,
            },
          }
        )
      );
        console.log('\n\nОтвет сервера:\n', response.data);
        return 'bot craete!';
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
      }
  }

  async getAllBots() {
    return this.botRepository.find();
  }

  async getBotByID(userID: number, botDataDto: BotDataDto) {
    await this.userBotService.isUserBot(userID, botDataDto.bot_id);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.apiURL}/bots/${botDataDto.bot_id}`,
          {
            headers: {
              Authorization: this.authHeader,
            },
          }
        )
      );
        console.log('\n\nОтвет сервера:\n', response.data);
        return {response: response.data};
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
      }
  }

  async updateBotActive(userID, botDataDto: BotDataDto) {
    const bot = await this.userBotService.isUserBot(userID, botDataDto.bot_id);
    if (bot) {
      bot.isActive = !(bot.isActive);
      await this.entityManager.save(bot);
      return `This action updates a #${botDataDto.bot_id} bot`;
    }
    return `This action not updates a #${botDataDto.bot_id} bot`;
  }

  async removeBotByID(userID, botDataDto: BotDataDto) {
    const bot = await this.userBotService.isUserBot(userID, botDataDto.bot_id);

    if (bot) {
      await this.botRepository.delete(botDataDto.bot_id)
      return `This action removes a #${botDataDto.bot_id} bot`;
    }
    return `Not delete`;
  }

}
