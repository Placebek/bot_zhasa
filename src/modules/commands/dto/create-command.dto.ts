import { IsNumber } from "class-validator";

export class BotDataDto {
    @IsNumber()
    bot_id: number;
}
