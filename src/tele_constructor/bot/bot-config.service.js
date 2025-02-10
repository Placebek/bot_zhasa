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
exports.BotConstuctor = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const token_model_1 = require("../token/token.model");
const tele_model_1 = require("../tele/tele.model");
const type_user_model_1 = require("../tele/type-user.model");
const fs = require("fs");
const path = require("path");
let BotConstuctor = class BotConstuctor {
    constructor(tokenModel, teleConstructorModel, typeUserModel) {
        this.tokenModel = tokenModel;
        this.teleConstructorModel = teleConstructorModel;
        this.typeUserModel = typeUserModel;
    }
    async getMainPyCode(telegram_id) {
        const tokenEntry = await this.tokenModel.findOne({ where: { telegram_id } });
        if (!tokenEntry) {
            throw new Error('Token not found');
        }
        const teleConstructors = await this.teleConstructorModel.findAll();
        if (!teleConstructors || teleConstructors.length === 0) {
            throw new Error('No TeleConstructor blocks found');
        }
        let mainPyCode = `from aiogram import Bot, Dispatcher, executor\n\n`;
        mainPyCode += `BOT_TOKEN = "${tokenEntry.token}"\n\n`;
        mainPyCode += `bot = Bot(token=BOT_TOKEN)\n`;
        mainPyCode += `dp = Dispatcher(bot)\n\n`;
        teleConstructors.forEach(block => {
            mainPyCode += `# Block: ${block.type}\n`;
            mainPyCode += block.code + '\n\n';
        });
        mainPyCode += `if __name__ == '__main__':\n    executor.start_polling(dp, skip_updates=True)`;
        const filePath = path.resolve(__dirname, `../../generated_files/main_${telegram_id}.py`);
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(filePath, mainPyCode);
        return filePath;
    }
    async addTypeUserCodeToFile(typeUserId) {
        const typeUser = await this.typeUserModel.findOne({
            where: { id: typeUserId },
            include: [token_model_1.Token, tele_model_1.TeleConstructor]
        });
        if (!typeUser || !typeUser.token || !typeUser.token.telegram_id) {
            throw new Error('TypeUser or Token not found');
        }
        const teleConstructor = await this.teleConstructorModel.findOne({ where: { type: typeUser.type_id } });
        if (!teleConstructor) {
            throw new Error('TeleConstructor not found for this type_id');
        }
        const token = typeUser.token;
        const telegram_id = token.telegram_id;
        const filePath = path.resolve(__dirname, `../../generated_files/main_${telegram_id}.py`);
        const codeToAdd = teleConstructor.code;
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const updatedContent = fileContent.replace('if __name__ == \'__main__\':', `${codeToAdd}\nif __name__ == '__main__':`);
            fs.writeFileSync(filePath, updatedContent);
        }
        else {
            throw new Error(`File main_${telegram_id}.py not found`);
        }
    }
};
exports.BotConstuctor = BotConstuctor;
exports.BotConstuctor = BotConstuctor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(token_model_1.Token)),
    __param(1, (0, sequelize_1.InjectModel)(tele_model_1.TeleConstructor)),
    __param(2, (0, sequelize_1.InjectModel)(type_user_model_1.TypeUser)),
    __metadata("design:paramtypes", [Object, Object, Object])
], BotConstuctor);
//# sourceMappingURL=bot-config.service.js.map