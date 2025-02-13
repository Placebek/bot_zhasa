import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from 'src/database/entities/commands.entity';
import { User } from 'src/database/entities/user.entity';
import { Bot } from 'src/database/entities/bot.entity';
import { CommonModule } from 'src/common/common.module';
import { ApiConfigModule } from 'src/config/config.module';
import { UserBotService } from 'src/common/common.service';
import { ApiConfigService } from 'src/config/api-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Command, User, Bot,
  ]),
  ApiConfigModule,
  CommonModule
  ],
  providers: [CommandsService, ],
  controllers: [CommandsController, ],
})
export class CommandsModule {}
