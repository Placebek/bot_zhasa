import { Controller, Get } from "@nestjs/common";
import { BotConstuctor } from "./bot-config.service";


@Controller('bot-constructor')
export class BotConstuctorController {
    constructor(private readonly botContructor: BotConstuctor) {}

    @Get('main-py')
    async generateMainPy() {
        const mainPyCode = await this.botContructor.getMainPyCode();
        return { main_py: mainPyCode };
    }
}