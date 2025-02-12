import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Bot } from "./bot.entity";
import { TeleConstructor } from "./teleConstructors.entity";

@Entity({name: 'commands'})
export class Command extends AbstractEntity<Command> {
  @Column()
  name: string;
   
  @Column()
  response: string;
  
  @Column({name: 'is_active', default: false})
  isActive: boolean;

  @OneToMany(() => TeleConstructor, (teleConstructor) => teleConstructor.command, {cascade: true})
  @JoinColumn({name: 'tele_constructor_id'})
  teleConstructors: TeleConstructor[];

  @ManyToOne(() => Bot, (bot) => bot.commands)
  bot: Bot;
}
