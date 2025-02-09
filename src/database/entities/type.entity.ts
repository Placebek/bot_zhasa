import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'types'})
export class Type extends AbstractEntity<Type> {
  @Column()
  name: string
}
