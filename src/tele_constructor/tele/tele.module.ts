import { Module } from '@nestjs/common';
import { TeleController } from './tele.controller';
import { BotModule } from '../bot/bot-config.module';

@Module({
  imports: [BotModule], 
  controllers: [TeleController],
})
export class TeleModule {}
