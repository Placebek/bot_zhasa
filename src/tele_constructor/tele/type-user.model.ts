import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Token } from "../token/token.model";  
import { TeleConstructor } from "../tele/tele.model";  

@Table({
    tableName: 'type_users',
    freezeTableName: true,
})
export class TypeUser extends Model<TypeUser> {
    @ForeignKey(() => Token)
    @Column
    token_id: number;

    @BelongsTo(() => Token)
    token: Token;

    @ForeignKey(() => TeleConstructor)  
    @Column
    type_id: number;  
    @BelongsTo(() => TeleConstructor)
    teleConstructor: TeleConstructor;
}
