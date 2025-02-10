import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Bot } from 'src/database/entities/bot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Bot
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
