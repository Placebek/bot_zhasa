import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bots/bots.module';
import { TypesModule } from './types/types.module';
import { JwtModule } from '@nestjs/jwt';
import { TeleConstructorsModule } from './tele-constructors/tele-constructors.module';
import { CommandsModule } from './commands/commands.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
        // signOptions: {
        //   expiresIn: '3h'
        // }
      }),
      global: true,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    DatabaseModule, AuthModule, BotsModule, UsersModule, TypesModule, TeleConstructorsModule, CommandsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
