import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>, // 유저 저장소 주입
  ) {}
  users: UserEntity[] = [];

  async create(createUserDto: CreateUserDto) {
    const {userName, userEmail, userPw, verifyPassword, userBd, userRole, userSchool} = createUserDto;

    try {
      if (this.users.find((user) => user.userEmail === userEmail)) {
        throw new UnprocessableEntityException('해당 이메일의 유저가 이미 존재합니다.');
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

      const user: UserEntity = {
        userName, userEmail, userPw: hashedpassword, userBd, userRole, userSchool,
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

  // 유저 정보 저장
  private async saveUser(
    name: string, 
    email: string, 
    password: string,
    birthday: string,
    role: Role,
    school: string,
    //signupVerifyToken: string
    ) {
    const user = new UserEntity(); // 새로운 유저 엔티티 객체 생성
    user.userName = name;
    user.userEmail = email;
    user.userPw = password;
    user.userBd = birthday;
    user.userRole = role;
    user.userSchool = school;
    //user.signupVerifyToken = signupVerifyToken;

    await this.usersRepository.save(user);
  }

  // 존재 여부 확인

}
