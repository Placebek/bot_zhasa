import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from '../../database/entities/bot.entity';
import { User } from 'src/database/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ApiConfigModule } from 'src/config/config.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Bot, User
  ]), HttpModule, ApiConfigModule, CommonModule],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule {}
