import { Controller, Get, Param } from "@nestjs/common";
import { BotConstuctor } from "./bot-config.service";
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('bot-constructor')
export class BotConstuctorController {
    constructor(private readonly botConstructor: BotConstuctor) {}

    @Get('main-py/:telegram_id')
    @ApiOperation({ summary: 'Generate Python file for a specific telegram user' })
    @ApiParam({ name: 'telegram_id', type: String, description: 'The telegram_id of the user' })
    @ApiResponse({
        status: 200,
        description: 'Generated Python code for the user',
        schema: {
            example: {
                main_py: 'generated python code here',
            },
        },
    })
    async generateMainPy(@Param('telegram_id') telegramId: string) {
        const mainPyCode = await this.botConstructor.getMainPyCode(telegramId);
        return { main_py: mainPyCode };
    }
}
