import { Column, Model, Table, DataType, ForeignKey } from "sequelize-typescript";
import { TeleConstructor } from "../tele/tele.model";
import { Token } from "../token/token.model"; 

export type CommandCreateAttributes = {
  name_command: string;
  response_command: string;
  tele_constructor_id: number;
  token_id: number;
  button_url?: string;
};

@Table({
    tableName: 'commands',
    freezeTableName: true,
})
export class Command extends Model<Command> {
    @Column
    name_command: string;

    @Column({
        type: DataType.TEXT,
    })
    response_command: string;

    @ForeignKey(() => TeleConstructor)
    @Column
    tele_constructor_id: number;

    @ForeignKey(() => Token)
    @Column 
    token_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    button_url?: string; 
}
