import { Model } from "sequelize-typescript";
import { TypeUser } from "./type-user.model";
export declare class TeleConstructor extends Model<TeleConstructor> {
    type: string;
    code: string;
    typeUsers: TypeUser[];
}
