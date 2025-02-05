import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/user.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await User.findOne({ where: { username }});
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        return user;
    }
}
