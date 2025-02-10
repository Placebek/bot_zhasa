import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BotConstuctor } from "./bot-config.service"; 
import { Token } from "../token/token.model";
import { TeleConstructor } from "../tele/tele.model";
import { TypeUser } from "../tele/type-user.model";

@Module({
  imports: [SequelizeModule.forFeature([Token, TeleConstructor, TypeUser])],
  providers: [BotConstuctor],
  exports: [BotConstuctor],
})
export class BotModule {}
