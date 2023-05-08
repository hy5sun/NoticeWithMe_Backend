import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      // 토큰이 유효한지 확인하기 위한 키
      secretOrKey: 'Secret1234',
      // 클라이언트에서 오는 토큰이 어디에서 오는지 명시 해 줌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { userEmail: string }) {
    const { userEmail } = payload;
    const user: UserEntity = await this.userService.findOne(userEmail);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}