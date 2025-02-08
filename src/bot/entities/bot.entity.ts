import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Bot extends AbstractEntity<Bot> {
  @ManyToOne(() => User, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user: User;
  
  @Column()
  name: string 
  
  @Column()
  hash_token: string
}
