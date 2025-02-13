import { Module } from '@nestjs/common';
import { UserBotService } from './common.service'; // Путь зависит от структуры проекта
import { User } from '../database/entities/user.entity';
import { Bot } from '../database/entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([
    Bot, User
  ]), HttpModule], 
  providers: [UserBotService],
  exports: [UserBotService], 
})
export class CommonModule {}
