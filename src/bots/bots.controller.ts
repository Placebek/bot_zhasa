import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
  // @Req() request: Request, 
  createUserBot(@Req() request, @Body() createBotDto: CreateBotDto) {
    return this.botsService.createUserBot(request.userID ,createBotDto);
  }

  @Get()
  getAllBots() {
    return this.botsService.getAllBots();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBotDto: UpdateBotDto) {
  //   return this.botsService.update(+id, updateBotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.botsService.remove(+id);
  // }
}
