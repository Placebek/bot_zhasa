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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeleConstructor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const type_user_model_1 = require("./type-user.model");
let TeleConstructor = class TeleConstructor extends sequelize_typescript_1.Model {
};
exports.TeleConstructor = TeleConstructor;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TeleConstructor.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TeleConstructor.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => type_user_model_1.TypeUser),
    __metadata("design:type", Array)
], TeleConstructor.prototype, "typeUsers", void 0);
exports.TeleConstructor = TeleConstructor = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'TeleConstructor',
        freezeTableName: true,
    })
], TeleConstructor);
//# sourceMappingURL=tele.model.js.map