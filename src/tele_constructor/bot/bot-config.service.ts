import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "../token/token.model"; 
import { TeleConstructor } from "../tele/tele.model"; 
import { TypeUser } from "../tele/type-user.model"; 
import * as fs from 'fs';
import * as path from 'path';

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
      throw new Error('Token not found');
    }

    const teleConstructors = await this.teleConstructorModel.findAll();
    if (!teleConstructors || teleConstructors.length === 0) {
      throw new Error('No TeleConstructor blocks found');
    }

    let mainPyCode = `from aiogram import Bot, Dispatcher, executor\n\n`;
    mainPyCode += `BOT_TOKEN = "${tokenEntry.token}"\n\n`;
    mainPyCode += `bot = Bot(token=BOT_TOKEN)\n`;
    mainPyCode += `dp = Dispatcher(bot)\n\n`;

    teleConstructors.forEach(block => {
      mainPyCode += `# Block: ${block.type}\n`;
      mainPyCode += block.code + '\n\n';
    });

    mainPyCode += `if __name__ == '__main__':\n    executor.start_polling(dp, skip_updates=True)`;

    const filePath = path.resolve(__dirname, `../../generated_files/main_${telegram_id}.py`);
    
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, mainPyCode);

    return filePath;
  }

  async addTypeUserCodeToFile(typeUserId: number): Promise<void> {
    const typeUser = await this.typeUserModel.findOne({ 
      where: { id: typeUserId }, 
      include: [Token, TeleConstructor]
    });
    if (!typeUser || !typeUser.token || !typeUser.token.telegram_id) {
      throw new Error('TypeUser or Token not found');
    }

    const teleConstructor = await this.teleConstructorModel.findOne({ where: { type: typeUser.type_id } });
    if (!teleConstructor) {
      throw new Error('TeleConstructor not found for this type_id');
    }

    const token = typeUser.token;
    const telegram_id = token.telegram_id;
    const filePath = path.resolve(__dirname, `../../generated_files/main_${telegram_id}.py`);

    const codeToAdd = teleConstructor.code;

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const updatedContent = fileContent.replace('if __name__ == \'__main__\':', `${codeToAdd}\nif __name__ == '__main__':`);
      fs.writeFileSync(filePath, updatedContent);
    } else {
      throw new Error(`File main_${telegram_id}.py not found`);
    }
  }
}
