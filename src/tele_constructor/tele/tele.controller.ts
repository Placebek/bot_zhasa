import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeleConstructor } from './tele.model';
import { TypeUser } from './type-user.model';
import { BotConstuctor } from '../bot/bot-config.service';
import { CreationAttributes } from 'sequelize';

@Controller('tele')
export class TeleController {
    constructor(private readonly botConstructor: BotConstuctor) {}

    @UseGuards(AuthGuard('basic'))
    @Get()
    async getAllTeleConstructors(): Promise<TeleConstructor[]> {
        return await TeleConstructor.findAll();
    }

    @UseGuards(AuthGuard('basic'))
    @Post('type-user/bulk')
    async createTypeUsers(@Body() typeUsers: CreationAttributes<TypeUser>[]) {
        console.log('Received body:', typeUsers);

        // Проверяем, что все объекты имеют правильную структуру
        for (const user of typeUsers) {
            if (!user.token_id || !user.type_id) {
                throw new Error('Both token_id and type_id are required');
            }
        }

        try {
            // Создаем записи в базе данных
            const createdTypeUsers = await TypeUser.bulkCreate(typeUsers, { validate: true });
            console.log('Created users:', createdTypeUsers);

            // Параллельно добавляем данные в файл для каждого созданного пользователя
            await Promise.all(createdTypeUsers.map(typeUser =>
                this.botConstructor.addTypeUserCodeToFile(typeUser.id)
            ));

            return createdTypeUsers;
        } catch (error) {
            console.error('Error while creating type users:', error);
            throw error;  // Ретранслируем ошибку, чтобы она была видна в ответе
        }
    }
}
