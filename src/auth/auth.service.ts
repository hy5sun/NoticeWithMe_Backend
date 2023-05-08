import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(authLoginDto: AuthLoginDto): Promise<{accessToken: string}> {
        const {userEmail, userPw} = authLoginDto;
        const user = await this.userService.findOne(userEmail);

        if (user && (await bcrypt.compare(userPw, user.userPw))) {
            const payload = {userEmail};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken: accessToken};
        } else {
            throw new UnauthorizedException('로그인 실패');
        }
    }
}
