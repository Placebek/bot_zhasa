import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';
import { TeleConstructor } from '../tele/tele.model';
import { TypeUser } from '../tele/type-user.model';
import { TokenController } from './token.controller';
import { BotConstuctor } from '../bot/bot-config.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Token, TeleConstructor, TypeUser]),
  ],
  controllers: [TokenController],
  providers: [BotConstuctor],
})
export class TokenModule {}
