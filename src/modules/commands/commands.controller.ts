import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { BotDataDto, AddCommandsToTheBotDto, AddCommandsToTheBotYourselfDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post('bot')
  async getCommandsByBotID(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.commandsService.getCommandsByBotID(request.userID, botDataDto);
  }

  @Get('all')
  async findAllCommands() {
    return this.commandsService.findAllCommands();
  }

  @Post('add-commands')
  async addCommandsToTheBot(@Body() addCommandsToTheBotDto: AddCommandsToTheBotDto) {
    return this.commandsService.addCommandsToTheBot(addCommandsToTheBotDto);
  }

  @Post('add-my-commands')
  async remove(@Body() addCommandsToTheBotYourselfDto: AddCommandsToTheBotYourselfDto) {
    return this.commandsService.addCommandsToTheBotYourself(addCommandsToTheBotYourselfDto);
  }
}
