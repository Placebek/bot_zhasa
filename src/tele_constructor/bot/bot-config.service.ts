import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "../token/token.model";
import { TeleConstructor } from "../tele/tele.model";
import { TypeUser } from "../tele/type-user.model";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

@Injectable()
export class BotConstuctor {
  constructor(
    @InjectModel(Token)
    private tokenModel: typeof Token,
    @InjectModel(TeleConstructor)
    private teleConstructorModel: typeof TeleConstructor,
    @InjectModel(TypeUser)
    private typeUserModel: typeof TypeUser
  ) {}

  async getMainPyCode(telegram_id: string): Promise<string> {
    const tokenEntry = await this.tokenModel.findOne({ where: { telegram_id } });
    if (!tokenEntry) {
      throw new Error("Token not found");
    }

    const filePath = path.join(process.cwd(), "generated_files", `main_${telegram_id}.py`);
    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, "utf8");
      if (existingContent.includes(`TOKEN = "${tokenEntry.token}"`)) {
        console.log(`Main file already exists for ${telegram_id}, skipping creation.`);
        return filePath;
      }
    }

    const mainPyCode = `import asyncio\nimport aiohttp\nfrom aiogram import Bot, Dispatcher\nfrom aiogram.types import Message\nfrom aiogram.filters import Command\n\n` +
      `TOKEN = "${tokenEntry.token}"\n` +
      `bot = Bot(token=TOKEN)\n` +
      `dp = Dispatcher()\n\n` +
      `async def delete_webhook():\n` +
      `    url = f"https://api.telegram.org/bot{TOKEN}/deleteWebhook"\n` +
      `    async with aiohttp.ClientSession() as session:\n` +
      `        async with session.post(url) as resp:\n` +
      `            print("Webhook deleted:", await resp.text())\n\n` +
      `@dp.message(Command("bot"))\n` +
      `async def info_command(message: Message):\n` +
      `    await message.answer("Это сделано через Конструктор Ботов - Made in Jandarbek")\n\n` +
      `async def main():\n` +
      `    await delete_webhook()\n` +
      `    await dp.start_polling(bot)\n\n`+
      `#1\n` +
      `if __name__ == "__main__":\n    asyncio.run(main())\n`+
      `#2`;

    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, mainPyCode);
    console.log(`File created at: ${filePath}`);

    this.startBotWithShell(telegram_id, filePath);
    return filePath;
  }

  async addTypeUserCodeToFile(typeUserId: number): Promise<void> {
    const typeUser = await this.typeUserModel.findOne({
        where: { id: typeUserId },
        include: [Token],
    });

    if (!typeUser || !typeUser.token || !typeUser.token.telegram_id) {
        throw new Error("TypeUser or Token not found");
    }

    const telegram_id = typeUser.token.telegram_id;
    const teleConstructor = await this.getTeleConstructor(typeUser.type_id);
    if (!teleConstructor) {
        throw new Error(`TeleConstructor not found for type_id: "${typeUser.type_id}"`);
    }

    const filePath = path.join(process.cwd(), "generated_files", `main_${telegram_id}.py`);
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filePath} not found. Generating file...`);
        await this.getMainPyCode(telegram_id);
    }

    let fileContent = fs.readFileSync(filePath, "utf8");

    fileContent = fileContent.replace(/#1[\s\S]*?#2/g, "");

    // 2. Добавляем новый код между `#1` и `#2`
    const codeToAdd = `\n\n# Block: ${teleConstructor.type}\n${teleConstructor.code.trim()}`;
    if (!fileContent.includes(codeToAdd.trim())) {
        fileContent += codeToAdd;
    }

    // 3. Добавляем новый `if __name__ == '__main__':` в конец файла
    fileContent += `\n#1\nif __name__ == '__main__':\n    asyncio.run(main())\n#2`;

    // 4. Записываем обновленный код обратно в файл
    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log(`File successfully updated at: ${filePath}`);

    this.restartBotWithShell(telegram_id, filePath);
  }

  private async getTeleConstructor(type_id: number | string) {
    return isNaN(Number(type_id))
      ? this.teleConstructorModel.findOne({ where: { type: type_id } })
      : this.teleConstructorModel.findOne({ where: { id: type_id } });
  }

  private startBotWithShell(telegram_id: string, filePath: string): void {
    exec(`bash bot.sh ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error starting bot: ${stderr}`);
      } else {
        console.log(`Bot ${telegram_id} started successfully`);
      }
    });
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
