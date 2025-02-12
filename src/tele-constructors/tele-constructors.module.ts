import { Module } from '@nestjs/common';
import { TeleConstructorsService } from './tele-constructors.service';
import { TeleConstructorsController } from './tele-constructors.controller';
import { TeleConstructor } from 'src/database/entities/teleConstructors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    TeleConstructor
  ])],
  controllers: [TeleConstructorsController],
  providers: [TeleConstructorsService],
})
export class TeleConstructorsModule {}
