import { Injectable } from '@nestjs/common';
import { BotDataDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'src/database/entities/commands.entity';
import { User } from 'src/database/entities/user.entity';
import { Bot } from 'src/database/entities/bot.entity';
import { EntityManager, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from 'src/config/api-config.service';
import { UserBotService } from 'src/common/common.service';

@Injectable()
export class CommandsService {
  private authHeader: string;
  private apiURL: string;

  constructor (
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
    private readonly entityManager: EntityManager,
    private readonly apiConfigService: ApiConfigService,  
    private readonly userBotService: UserBotService,
  ) {
    this.authHeader = this.apiConfigService.authHeader;
    this.apiURL = this.apiConfigService.apiURL;
  }

  async getCommandsByBotID(userID, botDataDto: BotDataDto) {
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

  findAll() {
    return `This action returns all commands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} command`;
  }

  update(id: number, updateCommandDto: UpdateCommandDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }

}
