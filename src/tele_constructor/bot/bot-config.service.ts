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

    let mainPyCode = `from aiogram import Bot, Dispatcher, executor\n\n`;
    mainPyCode += `BOT_TOKEN = "${tokenEntry.token}"\n\n`;
    mainPyCode += `bot = Bot(token=BOT_TOKEN)\n`;
    mainPyCode += `dp = Dispatcher(bot)\n\n`;
    mainPyCode += `if __name__ == '__main__':\n    executor.start_polling(dp, skip_updates=True)`;

    const filePath = path.join(process.cwd(), 'generated_files', `main_${telegram_id}.py`);
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFile(filePath, mainPyCode, (err) => {
      if (err) {
        console.error(`Failed to create file: ${err}`);
      } else {
        console.log(`File created at: ${filePath}`);
      }
    });
    
    return filePath;
  }

  async addTypeUserCodeToFile(typeUserId: number): Promise<void> {
    const typeUser = await this.typeUserModel.findOne({ 
        where: { id: typeUserId }, 
        include: [Token]
    });

    if (!typeUser || !typeUser.token || !typeUser.token.telegram_id) {
        throw new Error('TypeUser or Token not found');
    }

    const telegram_id = typeUser.token.telegram_id;
    console.log(`Processing TypeUser with ID: ${typeUserId}, Telegram ID: ${telegram_id}`);

    let teleConstructor;
    if (isNaN(Number(typeUser.type_id))) {
      console.log(`Searching for TeleConstructor by type: "${typeUser.type_id}"`);
      teleConstructor = await this.teleConstructorModel.findOne({ where: { type: typeUser.type_id } });
    } else {
      console.log(`Searching for TeleConstructor by ID: "${typeUser.type_id}"`);
      teleConstructor = await this.teleConstructorModel.findOne({ where: { id: typeUser.type_id } });
    }

    if (!teleConstructor) {
        throw new Error(`TeleConstructor not found for type_id: "${typeUser.type_id}"`);
    }

    const filePath = path.join(process.cwd(), 'generated_files', `main_${telegram_id}.py`);

    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filePath} not found. Generating file...`);
        await this.getMainPyCode(telegram_id);
    }

    let fileContent = fs.readFileSync(filePath, 'utf8');
    const codeToAdd = `\n\n# Block: ${teleConstructor.type}\n${teleConstructor.code.trim()}`;

    if (fileContent.includes(codeToAdd.trim())) {
        console.log(`Code block already exists in ${filePath}, skipping...`);
        return;
    }

    const insertionPoint = "if __name__ == '__main__':";
    if (fileContent.includes(insertionPoint)) {
        fileContent = fileContent.replace(
            insertionPoint, 
            `${codeToAdd}\n\n${insertionPoint}`
        );
    } else {
        fileContent += `\n\n${codeToAdd}`;
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`File successfully updated at: ${filePath}`);
    
  }
}
