import { BasicStrategy } from "passport-http";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.model";

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
    constructor(private authService: AuthService) {
        super({
            realm: 'MyApp', 
        });
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
