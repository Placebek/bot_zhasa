import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { BasicAuthStrategy } from './auth/basic.strategy';
import { TeleConstructor } from './tele_constructor/tele/tele.model';
import { Token } from './tele_constructor/token/token.model'; 
import { TeleModule } from './tele_constructor/tele/tele.module';
import { TokenModule } from './tele_constructor/token/token.module';
import { TypeUser } from './tele_constructor/tele/type-user.model';
import { BotModule } from './tele_constructor/bot/bot-config.module';
import { CommandsModule } from './tele_constructor/commands/commands.module';
import { Command } from './tele_constructor/commands/commands.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [User, TeleConstructor, Token, TypeUser, Command],
        autoLoadModels: false,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
    TeleModule,
    TokenModule,
    BotModule,
    CommandsModule,
  ],
  providers: [AuthService, BasicAuthStrategy],
  exports: [AuthService],
})
export class AppModule {}
