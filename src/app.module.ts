import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { BasicAuthStrategy } from './auth/basic.strategy';

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
        models: [User],
        autoLoadModels: false,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
  providers: [AuthService, BasicAuthStrategy],
  exports: [AuthService],
})
export class AppModule {}
