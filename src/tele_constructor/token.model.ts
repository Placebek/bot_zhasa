import { Column, Model, Table } from "sequelize-typescript";


@Table
export class Token extends Model<Token> {
    @Column
    token: string
}