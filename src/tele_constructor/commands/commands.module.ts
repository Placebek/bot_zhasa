import { Module } from '@nestjs/common';
import { Command } from './commands.model';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeleConstructor } from '../tele/tele.model';
import { Token } from '../token/token.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Command, TeleConstructor, Token]), 
  ],
  controllers: [CommandsController], 
  providers: [CommandsService],       
})
export class CommandsModule {}
