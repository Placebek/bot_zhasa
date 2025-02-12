import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Bot } from "./bot.entity";

@Entity({name: 'users'})
export class User extends AbstractEntity<User> {
  @Column()
  username: string
   
  @Column()
  password: string
  
  @Column()
  email: string

  @OneToMany(() => Bot, (bot) => bot.user, {cascade: true})
  bots: Bot[];
}
