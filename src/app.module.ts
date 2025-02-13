import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BotsModule } from './modules/bots/bots.module';
import { TypesModule } from './modules/types/types.module';
import { JwtModule } from '@nestjs/jwt';
import { TeleConstructorsModule } from './modules/tele-constructors/tele-constructors.module';
import { CommandsModule } from './modules/commands/commands.module';
import config from './config/config';
import { ApiConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        // signOptions: {
        //   expiresIn: '3h'
        // }
      }),
      global: true,
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    BotsModule,
    UsersModule,
    TypesModule,
    TeleConstructorsModule,
    CommandsModule,
    ApiConfigModule,  // Импортируешь ApiConfigModule
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
