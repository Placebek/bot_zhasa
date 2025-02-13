import { ExecutionContext, Injectable, Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
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

  async findBotByID(id: number) {
    return this.botRepository.findOne({
      where: {id},
    });
  }

  async updateBotActive(userID, id: number) {
    const bot = await this.userBotService.isUserBot(userID, id);
    if (bot) {
      bot.isActive = !(bot.isActive);
      await this.entityManager.save(bot);
      return `This action updates a #${id} bot`;
    }
    return `This action not updates a #${id} bot`;
  }

  async removeBotByID(userID, id: number) {
    const bot = await this.userBotService.isUserBot(userID, id);

    if (bot) {
      await this.botRepository.delete(id)
      return `This action removes a #${id} bot`;
    }
    return `Not delete`;
  }

}
