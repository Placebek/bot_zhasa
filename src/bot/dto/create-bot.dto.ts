import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateBotDto {
    name: string;
    hash_token: string;
    user: CreateUserDto;
}
