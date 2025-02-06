import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "./token.model";
import { TeleConstructor } from "./tele.model";


@Injectable()
export class BotConstuctor {
    constructor(
        @InjectModel(Token)
        private tokenModel: typeof Token,
        @InjectModel(TeleConstructor)
        private teleConstructorModel: typeof TeleConstructor,    
    ) {}

    async getMainPyCode(): Promise<string> {
        const tokenEntry = await this.tokenModel.findOne();
        if (!tokenEntry) {
            throw new Error('Token joq')
        }

        const teleConstructors = await this.teleConstructorModel.findAll();

        let mainPyCode = `from aiogram import Bot, Dispatcher, executor\n\n`;
        mainPyCode += `BOT_TOKEN = "${tokenEntry.token}"\n\n`;
        mainPyCode += `bot = Bot(token=BOT_TOKEN)\n`;
        mainPyCode += `dp = Dispatcher(bot)\n\n`;

        teleConstructors.forEach(block => {
            mainPyCode += `# Block: ${block.type}\n`;
            mainPyCode += block.code + '\n\n';
        });

        mainPyCode += `if __name__ == '__main__':\n    executor.start_polling(dp, skip_updates=True)`

        return mainPyCode;
    }
}
