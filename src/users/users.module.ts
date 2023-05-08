import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([UserEntity])], // userModule 내에 사용할 저장소 등록
})
export class UsersModule {}
