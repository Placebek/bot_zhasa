import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotDataDto, CreateBotDto } from './dto/create-bot.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('bots')
export class BotsController {
  constructor(
    private readonly botsService: BotsService,
  ) {}

  @Post('create')
  async createUserBot(@Req() request, @Body() createBotDto: CreateBotDto) {
    return this.botsService.createUserBot(request.userID ,createBotDto);
  }

  @Get('all')
  async getAllBots() {
    return this.botsService.getAllBots();
  }

  @Get('id')
  async getBotByID(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.botsService.getBotByID(request.userID, botDataDto);
  }

  @Put('active/id')
  async updateBotActive(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.botsService.updateBotActive(request.userID, botDataDto);
  }

  @Delete('id')
  async removeBotByID(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.botsService.removeBotByID(request.userID, botDataDto);
  }
}
