"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bot_config_service_1 = require("./bot-config.service");
const token_model_1 = require("../token/token.model");
const tele_model_1 = require("../tele/tele.model");
const type_user_model_1 = require("../tele/type-user.model");
let BotModule = class BotModule {
};
exports.BotModule = BotModule;
exports.BotModule = BotModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([token_model_1.Token, tele_model_1.TeleConstructor, type_user_model_1.TypeUser])],
        providers: [bot_config_service_1.BotConstuctor],
        exports: [bot_config_service_1.BotConstuctor],
    })
], BotModule);
//# sourceMappingURL=bot-config.module.js.map