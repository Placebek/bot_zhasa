import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/database/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Command } from "./commands.entity";

@Entity({name: 'bots'})
export class Bot extends AbstractEntity<Bot> {
  @ManyToOne(() => User, (user) => user.bots)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string 
  
  @Column()
  token: string

  @Column({ name: 'is_active', default: false})
  isActive: boolean

  @OneToMany(() => Command, (command) => command.bot, {cascade: true})
  @JoinColumn({name: 'command_id'})
  commands: Command[];
}
