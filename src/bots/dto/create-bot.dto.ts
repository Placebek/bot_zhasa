import { CreateUserDto } from "src/users/dto/create-user.dto";
import { IsEmail, isString, IsString, Matches, MinLength } from "class-validator";

export class CreateBotDto {
    @IsString()
    name: string;

    @IsString()
    hash_token: string;
}
