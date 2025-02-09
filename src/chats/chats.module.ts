import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/database/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Chat
  ])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
