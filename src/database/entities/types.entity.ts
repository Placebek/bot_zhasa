import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TeleConstructor } from "./teleConstructors.entity";

@Entity({name: 'types'})
export class Type extends AbstractEntity<Type> {
  @Column()
  name: string

  @OneToMany(() => TeleConstructor, (teleConstructor) => teleConstructor.type, { cascade: true })
  teleConstructors: TeleConstructor[];
}
