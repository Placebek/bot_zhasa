import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Chat } from "./chat.entity";

@Entity({name: 'types'})
export class Type extends AbstractEntity<Type> {
  @Column()
  name: string;

  @OneToMany(() => Chat, (chat) => chat.type)
  chats: Chat[];
}
