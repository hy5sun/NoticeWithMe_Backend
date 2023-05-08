import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} // authService 의존성 주입

    @Post('signin')
    signIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authLoginDto);
    }
}
