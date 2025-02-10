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
exports.TypeUser = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const token_model_1 = require("../token/token.model");
const tele_model_1 = require("../tele/tele.model");
let TypeUser = class TypeUser extends sequelize_typescript_1.Model {
};
exports.TypeUser = TypeUser;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => token_model_1.Token),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TypeUser.prototype, "token_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => token_model_1.Token),
    __metadata("design:type", token_model_1.Token)
], TypeUser.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tele_model_1.TeleConstructor),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TypeUser.prototype, "type_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tele_model_1.TeleConstructor),
    __metadata("design:type", tele_model_1.TeleConstructor)
], TypeUser.prototype, "teleConstructor", void 0);
exports.TypeUser = TypeUser = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'type_users',
        freezeTableName: true,
    })
], TypeUser);
//# sourceMappingURL=type-user.model.js.map