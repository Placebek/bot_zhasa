"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeleModule = void 0;
const common_1 = require("@nestjs/common");
const tele_controller_1 = require("./tele.controller");
const bot_config_module_1 = require("../bot/bot-config.module");
let TeleModule = class TeleModule {
};
exports.TeleModule = TeleModule;
exports.TeleModule = TeleModule = __decorate([
    (0, common_1.Module)({
        imports: [bot_config_module_1.BotModule],
        controllers: [tele_controller_1.TeleController],
    })
], TeleModule);
//# sourceMappingURL=tele.module.js.map