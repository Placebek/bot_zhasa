import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateBotDto {
    name: string;
    hash_token: string;
    user: CreateUserDto;
}
