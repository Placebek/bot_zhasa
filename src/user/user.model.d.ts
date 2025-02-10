import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    username: string;
    password: string;
}
