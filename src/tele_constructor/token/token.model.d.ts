import { Model } from "sequelize-typescript";
export interface TokenCreationAttrs {
    token: string;
    telegram_id: string;
}
export declare class Token extends Model<Token> {
    token: string;
    telegram_id: string;
}
