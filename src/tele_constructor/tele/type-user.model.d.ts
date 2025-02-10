import { Model } from "sequelize-typescript";
import { Token } from "../token/token.model";
import { TeleConstructor } from "../tele/tele.model";
export declare class TypeUser extends Model<TypeUser> {
    token_id: number;
    token: Token;
    type_id: number;
    teleConstructor: TeleConstructor;
}
