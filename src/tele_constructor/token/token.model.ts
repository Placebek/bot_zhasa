import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { TypeUser } from "../tele/type-user.model"; 

export interface TokenCreationAttrs {
  token: string;
  telegram_id: string;
}

@Table({
  tableName: 'tokens', 
  freezeTableName: true,
})
export class Token extends Model<Token> {
  @Column
  token: string;

  @Column
  telegram_id: string;

}
