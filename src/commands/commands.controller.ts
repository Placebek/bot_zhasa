import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CommandsService } from 'src/modules/commands/commands.service';
import { BotDataDto } from 'src/modules/commands/dto/create-command.dto';
import { UpdateCommandDto } from 'src/modules/commands/dto/update-command.dto';

@UseGuards(AuthenticationGuard)
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  getCommandsByBotID(@Req() request, @Body() botDataDto: BotDataDto) {
    return this.commandsService.getCommandsByBotID(request.userID, botDataDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
    return this.commandsService.update(+id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(+id);
  }
}
