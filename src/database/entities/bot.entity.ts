import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/database/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Chat } from "./chat.entity";

@Entity({name: 'bots'})
export class Bot extends AbstractEntity<Bot> {
  @ManyToOne(() => User, (user) => user.bots, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string 
  
  @Column()
  hash_token: string

  @Column({ name: 'is_active', default: false})
  isActive: boolean

  @OneToMany(() => Chat, (chat) => chat.bot)
  chats: Chat[];
}
