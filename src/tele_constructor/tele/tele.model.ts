import { Column, Model, Table, HasMany, DataType } from "sequelize-typescript";
import { TypeUser } from "./type-user.model"; 

@Table({
    tableName: 'TeleConstructor',
    freezeTableName: true,
})
export class TeleConstructor extends Model<TeleConstructor> {
    @Column
    type: string;

    @Column({
        type: DataType.TEXT,
    })
    code: string;

    @HasMany(() => TypeUser)  
    typeUsers: TypeUser[];
}
