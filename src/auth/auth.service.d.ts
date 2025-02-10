import { User } from "src/user/user.model";
export declare class AuthService {
    validateUser(username: string, password: string): Promise<User | null>;
}
