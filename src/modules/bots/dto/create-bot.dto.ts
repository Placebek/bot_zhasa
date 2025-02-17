import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { IsEmail, IsNumber, isString, IsString, Matches, MinLength } from "class-validator";

export class CreateBotDto {
    @IsString()
    name: string;

    @IsString()
    token: string;
}


export class BotDataDto {
    @IsNumber()
    bot_id: number;
}

