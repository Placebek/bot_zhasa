import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Bot } from "./bot.entity";
import { Type } from "./types.entity";
import { Command } from "./commands.entity";

@Entity({name: 'tele_constructors'})
export class TeleConstructor extends AbstractEntity<TeleConstructor> {
  @ManyToOne(() => Type, (type) => type.teleConstructors)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column({type: 'text'})
  code: string

  @ManyToOne(() => Command, (command) => command.teleConstructors)
  command: Command;
}
