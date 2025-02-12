import { AbstractEntity } from "src/database/abstract.entity";
import { Bot } from "src/database/entities/bot.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Type } from "./type.entity";

@Entity({name: 'chats'})
export class Chat extends AbstractEntity<Chat> {
  @ManyToOne(() => Bot, (bot) => bot.chats, { cascade: true })
  @JoinColumn({ name: 'bot_id' })
  bot: Bot;
  
  @Column({type: 'text'})
  massage: string
  
  @OneToOne(() => Chat, {cascade: true})
  @JoinColumn({name: 'parent_id'})
  parentID: number

  @ManyToOne(() => Type, (type) => type.chats, {cascade: true})
  @JoinColumn({name: 'type_id'})
  type: Type;
}
