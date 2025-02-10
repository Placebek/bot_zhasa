import { BasicStrategy } from "passport-http";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.model";
declare const BasicAuthStrategy_base: new (...args: [] | [options: import("passport-http").BasicStrategyOptions<true>] | [options: import("passport-http").BasicStrategyOptions<false>]) => BasicStrategy & {
    validate(...args: any[]): unknown;
};
export declare class BasicAuthStrategy extends BasicAuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<User>;
}
export {};
