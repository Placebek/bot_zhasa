import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'users'})
export class User extends AbstractEntity<User> {
  @Column()
  username: string
   
  @Column()
  password: string
  
  @Column()
  email: string
}
