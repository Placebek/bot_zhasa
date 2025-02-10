"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const passport_1 = require("@nestjs/passport");
const user_model_1 = require("./user/user.model");
const user_module_1 = require("./user/user.module");
const auth_service_1 = require("./auth/auth.service");
const basic_strategy_1 = require("./auth/basic.strategy");
const tele_model_1 = require("./tele_constructor/tele/tele.model");
const token_model_1 = require("./tele_constructor/token/token.model");
const tele_module_1 = require("./tele_constructor/tele/tele.module");
const token_module_1 = require("./tele_constructor/token/token.module");
const type_user_model_1 = require("./tele_constructor/tele/type-user.model");
const bot_config_module_1 = require("./tele_constructor/bot/bot-config.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    dialect: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    models: [user_model_1.User, tele_model_1.TeleConstructor, token_model_1.Token, type_user_model_1.TypeUser],
                    autoLoadModels: false,
                    logging: false,
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
            user_module_1.UserModule,
            tele_module_1.TeleModule,
            token_module_1.TokenModule,
            bot_config_module_1.BotModule,
        ],
        providers: [auth_service_1.AuthService, basic_strategy_1.BasicAuthStrategy],
        exports: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map