import { isNumber, IsNumber, IsString } from "class-validator";

export class BotDataDto {
    @IsNumber()
    bot_id: number;
}


export class AddCommandsToTheBotDto {
    @IsNumber()
    token_id: number;

    @IsNumber()
    type_id: number;
}

export class AddCommandsToTheBotYourselfDto {
    @IsString()
    name_command: string;

    @IsString()
    response_command: string;

    @IsNumber()
    teleconstructor_id: number;

    @IsNumber()
    token_id: number;

    @IsString()
    button_url: string;
}