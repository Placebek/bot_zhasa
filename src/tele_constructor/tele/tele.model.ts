import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { TypeUser } from "./type-user.model"; 

@Table({
    tableName: 'TeleConstructor',
    freezeTableName: true,
})
export class TeleConstructor extends Model<TeleConstructor> {
    @Column
    type: string;

    @Column
    code: string;

    @HasMany(() => TypeUser)  
    typeUsers: TypeUser[];
}
