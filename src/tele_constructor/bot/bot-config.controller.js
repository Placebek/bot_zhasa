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
exports.BotConstuctorController = void 0;
const common_1 = require("@nestjs/common");
const bot_config_service_1 = require("./bot-config.service");
const swagger_1 = require("@nestjs/swagger");
let BotConstuctorController = class BotConstuctorController {
    constructor(botConstructor) {
        this.botConstructor = botConstructor;
    }
    async generateMainPy(telegramId) {
        const mainPyCode = await this.botConstructor.getMainPyCode(telegramId);
        return { main_py: mainPyCode };
    }
};
exports.BotConstuctorController = BotConstuctorController;
__decorate([
    (0, common_1.Get)('main-py/:telegram_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Python file for a specific telegram user' }),
    (0, swagger_1.ApiParam)({ name: 'telegram_id', type: String, description: 'The telegram_id of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Generated Python code for the user',
        schema: {
            example: {
                main_py: 'generated python code here',
            },
        },
    }),
    __param(0, (0, common_1.Param)('telegram_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BotConstuctorController.prototype, "generateMainPy", null);
exports.BotConstuctorController = BotConstuctorController = __decorate([
    (0, common_1.Controller)('bot-constructor'),
    __metadata("design:paramtypes", [bot_config_service_1.BotConstuctor])
], BotConstuctorController);
//# sourceMappingURL=bot-config.controller.js.map