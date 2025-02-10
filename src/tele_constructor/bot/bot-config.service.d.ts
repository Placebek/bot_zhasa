import { Token } from "../token/token.model";
import { TeleConstructor } from "../tele/tele.model";
import { TypeUser } from "../tele/type-user.model";
export declare class BotConstuctor {
    private tokenModel;
    private teleConstructorModel;
    private typeUserModel;
    constructor(tokenModel: typeof Token, teleConstructorModel: typeof TeleConstructor, typeUserModel: typeof TypeUser);
    getMainPyCode(telegram_id: string): Promise<string>;
    addTypeUserCodeToFile(typeUserId: number): Promise<void>;
}
