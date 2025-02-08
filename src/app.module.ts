import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    DatabaseModule, UserModule, BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
