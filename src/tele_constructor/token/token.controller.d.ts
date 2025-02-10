import { Token } from './token.model';
import { CreateTokenDto } from '../dto/create-token.dto';
import { BotConstuctor } from '../bot/bot-config.service';
export declare class TokenController {
    private readonly botConstructor;
    constructor(botConstructor: BotConstuctor);
    createToken(createTokenDto: CreateTokenDto): Promise<Token>;
}
