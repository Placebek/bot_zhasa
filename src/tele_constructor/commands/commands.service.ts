import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Command, CommandCreateAttributes } from './commands.model';
import { TeleConstructor } from '../tele/tele.model';
import { Token } from '../token/token.model';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class CommandsService {
  constructor(
    @InjectModel(Command) private commandModel: typeof Command,
    @InjectModel(TeleConstructor) private teleConstructorModel: typeof TeleConstructor,
    @InjectModel(Token) private tokenModel: typeof Token
  ) {}

  async addCommandToFile(
    name_command: string,
    response_command: string,
    teleconstructor_id: number,
    token_id: number,
    button_url?: string
  ): Promise<void> {
    // Создаем команду, используя тип CommandCreateAttributes (или аналогичный)
    const commandData: CommandCreateAttributes = {
      name_command,
      response_command,
      tele_constructor_id: teleconstructor_id,
      token_id: token_id,
      button_url: button_url ?? undefined,
    };

    // Создаем команду в базе данных
    const command = await this.commandModel.create(commandData as any);

    // Ищем объект TeleConstructor по ID
    const teleConstructor = await this.teleConstructorModel.findByPk(teleconstructor_id);
    if (!teleConstructor) {
      throw new Error('TeleConstructor not found');
    }

    // Формируем код команды
    const commandCode = button_url
      ? `
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

@dp.message(Command("${name_command}"))
async def ${name_command}_command(message: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Click me", url="${button_url}")]
    ])
    await message.answer("${response_command}", reply_markup=keyboard)
    `
      : `
@dp.message(Command("${name_command}"))
async def ${name_command}_command(message: Message):
    await message.answer("${response_command}")
    `;

    // Ищем токен для бота по ID
    const token = await this.tokenModel.findByPk(token_id);
    if (!token || !token.telegram_id) {
      throw new Error('Token or telegram_id not found');
    }

    const telegramId = token.telegram_id;
    const filePath = path.join(process.cwd(), 'generated_files', `main_${telegramId}.py`);

    // Проверяем, существует ли файл main.py
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${filePath} does not exist`);
    }

    // Читаем содержимое файла и обновляем его
    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = fileContent.replace(/#1[\s\S]*?#2/g, '');
    fileContent += `\n\n# Block: ${teleConstructor.type}\n${commandCode}`;
    fileContent += `\n#1\nif __name__ == '__main__':\n    import asyncio\n    asyncio.run(main())\n#2`;

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`File successfully updated at: ${filePath}`);

    this.restartBotWithShell(telegramId, filePath);
  }

  private restartBotWithShell(telegram_id: string, filePath: string): void {
    exec(`bash restart.sh ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error restarting bot: ${stderr}`);
      } else {
        console.log(`Bot ${telegram_id} restarted successfully`);
      }
    });
  }
}
