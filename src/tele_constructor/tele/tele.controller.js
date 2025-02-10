"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeleController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const tele_model_1 = require("./tele.model");
const type_user_model_1 = require("./type-user.model");
const bot_config_service_1 = require("../bot/bot-config.service");
let TeleController = class TeleController {
    constructor(botConstructor) {
        this.botConstructor = botConstructor;
    }
    async getAllTeleConstructors() {
        return await tele_model_1.TeleConstructor.findAll();
    }
    async createTypeUsers(typeUsers) {
        console.log('Received body:', typeUsers);
        for (const user of typeUsers) {
            if (!user.token_id || !user.type_id) {
                throw new Error('Both token_id and type_id are required');
            }
        }
        try {
            const createdTypeUsers = await type_user_model_1.TypeUser.bulkCreate(typeUsers, { validate: true });
            console.log('Created users:', createdTypeUsers);
            await Promise.all(createdTypeUsers.map(typeUser => this.botConstructor.addTypeUserCodeToFile(typeUser.id)));
            return createdTypeUsers;
        }
        catch (error) {
            console.error('Error while creating type users:', error);
            throw error;
        }
    }
};
exports.TeleController = TeleController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('basic')),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeleController.prototype, "getAllTeleConstructors", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('basic')),
    (0, common_1.Post)('type-user/bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TeleController.prototype, "createTypeUsers", null);
exports.TeleController = TeleController = __decorate([
    (0, common_1.Controller)('tele'),
    __metadata("design:paramtypes", [bot_config_service_1.BotConstuctor])
], TeleController);
//# sourceMappingURL=tele.controller.js.map