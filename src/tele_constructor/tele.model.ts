import { Column, Model, Table } from "sequelize-typescript";


@Table
export class TeleConstructor extends Model<TeleConstructor> {
    @Column
    type: string

    @Column
    code: string
} 