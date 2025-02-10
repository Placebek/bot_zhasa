import { TeleConstructor } from './tele.model';
import { TypeUser } from './type-user.model';
import { BotConstuctor } from '../bot/bot-config.service';
import { CreationAttributes } from 'sequelize';
export declare class TeleController {
    private readonly botConstructor;
    constructor(botConstructor: BotConstuctor);
    getAllTeleConstructors(): Promise<TeleConstructor[]>;
    createTypeUsers(typeUsers: CreationAttributes<TypeUser>[]): Promise<TypeUser[]>;
}
