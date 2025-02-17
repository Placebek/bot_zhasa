import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { BotDataDto, AddCommandsToTheBotDto, AddCommandsToTheBotYourselfDto } from './dto/create-command.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post('bot/id')
  async getCommandsByBotID(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.commandsService.getCommandsByBotID(request.userID, botDataDto);
  }

  @Get('all')
  async findAllCommands() {
    return this.commandsService.findAllCommands();
  }

  @Post('add')
  async addCommandsToTheBot(@Body() addCommandsToTheBotDto: AddCommandsToTheBotDto) {
    return this.commandsService.addCommandsToTheBot(addCommandsToTheBotDto);
  }

  @Post('add-my')
  async addCommandsToTheBotYourself(@Body() addCommandsToTheBotYourselfDto: AddCommandsToTheBotYourselfDto) {
    return this.commandsService.addCommandsToTheBotYourself(addCommandsToTheBotYourselfDto);
  }
}
