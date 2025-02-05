import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    exports: [SequelizeModule]
})
export class UserModule {}
