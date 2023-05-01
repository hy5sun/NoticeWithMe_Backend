import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const {userName, userEmail, userPw, verifyPassword, userBd, userRole, userSchool} = createUserDto;

    try {
      if (this.users.find((user) => user.userEmail === userEmail)) {
        return {
          ok: false,
          error: '해당 이메일의 유저는 이미 존재합니다.'
        };
      }
  
      if (userPw !== verifyPassword) {
        return {
          ok : false,
          error: '비밀번호가 다릅니다.'
        };
      }
  
      const regex = new RegExp( // 비번에 문자/숫자/특수문자가 있는지 확인
        /(?=.*[!@#$%^&\*\(\)_\+\-=\[\]\{\};\':\"\\\|,\.<>\/\?]+)(?=.*[a-zA-Z]+)(?=.*\d+)/,
      );
  
      const passwordOk = regex.test(userPw);
  
      if (!passwordOk) {
        return {
          ok: false,
          error: '비밀번호에 문자, 숫자, 기호가 포함되어 있어야 합니다.'
        };
      }
      const hashedpassword = await bcrypt.hash(userPw, 10);

      const user: User = {
        userName, userEmail, userPw: hashedpassword, userBd, userRole, userSchool
      }
      this.users.push(user);
  
      return {ok: true};
    } catch(e) {
      return {ok: false, error: '계정을 만들 수 없습니다.'};
    }
    
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
