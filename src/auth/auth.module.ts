import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
        secret: 'secret1234',
        signOptions: {
            expiresIn: 3600,
        }}),
        TypeOrmModule.forFeature([UsersRepository])
    ],
    providers: [],
})
export class AuthModule {}
