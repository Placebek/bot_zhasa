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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const token_model_1 = require("./token.model");
const create_token_dto_1 = require("../dto/create-token.dto");
const bot_config_service_1 = require("../bot/bot-config.service");
let TokenController = class TokenController {
    constructor(botConstructor) {
        this.botConstructor = botConstructor;
    }
    async createToken(createTokenDto) {
        const token = await token_model_1.Token.create(createTokenDto);
        await this.botConstructor.getMainPyCode(token.telegram_id);
        return token;
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('basic')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "createToken", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [bot_config_service_1.BotConstuctor])
], TokenController);
//# sourceMappingURL=token.controller.js.map