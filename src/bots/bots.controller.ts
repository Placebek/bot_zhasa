import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
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

  @Get()
  async getAllBots() {
    return this.botsService.getAllBots();
  }

  @Get(':id')
  async findBotByID(@Param('id') id: string) {
    return this.botsService.findBotByID(+id);
  }

  @Put('active/:id')
  async updateBotActive(@Req() request, @Param('id') id: string) {
    return this.botsService.updateBotActive(request.userID, +id);
  }

  @Delete(':botID')
  async removeBotByID(@Req() request, @Param('botID') botID: string) {
    return this.botsService.removeBotByID(request.userID, +botID);
  }
}
