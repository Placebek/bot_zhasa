import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @UseGuards(AuthGuard('basic'))
  @Post('add-command')
  async addCommand(
    @Body() commandData: {
      name_command: string;
      response_command: string;
      teleconstructor_id: number;
      token_id: number;
      button_url?: string; // Добавили кнопку (необязательный параметр)
    }
  ): Promise<string> {
    try {
      await this.commandsService.addCommandToFile(
        commandData.name_command,
        commandData.response_command,
        commandData.teleconstructor_id,
        commandData.token_id,
        commandData.button_url
      );
      return 'Command added successfully';
    } catch (error) {
      console.error('Error adding command:', error);
      throw error;
    }
  }
}
