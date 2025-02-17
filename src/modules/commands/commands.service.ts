import { Injectable } from '@nestjs/common';
import { BotDataDto, AddCommandsToTheBotDto, AddCommandsToTheBotYourselfDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'src/database/entities/commands.entity';
import { User } from 'src/database/entities/user.entity';
import { Bot } from 'src/database/entities/bot.entity';
import { EntityManager, Repository } from 'typeorm';
import { ApiConfigService } from 'src/config/api-config.service';
import { UserBotService } from 'src/common/common.service';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class CommandsService {
  private authHeader: string;
  private apiURL: string;

  constructor (
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
    private readonly entityManager: EntityManager,
    private readonly httpService: HttpService,
    private readonly apiConfigService: ApiConfigService,  
    private readonly userBotService: UserBotService,
  ) {
    this.authHeader = this.apiConfigService.authHeader;
    this.apiURL = this.apiConfigService.apiURL;
  }

  async getCommandsByBotID(userID: number, botDataDto: BotDataDto) {
    const bot = await this.userBotService.isUserBot(userID, botDataDto.bot_id);

    // try {
    //   const response = await firstValueFrom(
    //     this.httpService.post(
    //       `${this.apiURL}/tokens`,
    //       {
    //         telegram_id: String(user.id),
    //         token: bot.token,
    //       },
    //       {
    //         headers: {
    //           Authorization: this.authHeader,
    //         },
    //       }
    //     )
    //   );
    //     console.log('\n\nОтвет сервера:\n', response.data);
    //     return 'bot craete!';
    //   } catch (error) {
    //     console.error('Ошибка при отправке запроса:', error);
    //     throw error;
    //   }
    return bot;
  }

  async findAllCommands() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.apiURL}/tele`,
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

  async addCommandsToTheBot(addCommandsToTheBotDto: AddCommandsToTheBotDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.apiURL}/tele/type-user/bulk`,
          {
            addCommandsToTheBotDto
          },
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

  async addCommandsToTheBotYourself(addCommandsToTheBotYourselfDto: AddCommandsToTheBotYourselfDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.apiURL}/commands/add-command`,
          {
            addCommandsToTheBotYourselfDto
          },
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
}
