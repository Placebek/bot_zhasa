import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from 'src/database/entities/commands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Command
  ])],
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}
