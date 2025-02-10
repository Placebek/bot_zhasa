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
exports.BasicAuthStrategy = void 0;
const passport_http_1 = require("passport-http");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let BasicAuthStrategy = class BasicAuthStrategy extends (0, passport_1.PassportStrategy)(passport_http_1.BasicStrategy) {
    constructor(authService) {
        super({
            realm: 'MyApp',
        });
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.BasicAuthStrategy = BasicAuthStrategy;
exports.BasicAuthStrategy = BasicAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], BasicAuthStrategy);
//# sourceMappingURL=basic.strategy.js.map