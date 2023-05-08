import { PickType, Field } from "@nestjs/graphql";
import { UserEntity } from "../entities/user.entity";
import { MinLength } from "class-validator";

export class CreateUserDto extends PickType(UserEntity, ['userName', 'userEmail', 'userPw', 'userBd', 'userRole', 'userSchool']){
    @Field((type) => String)
    @MinLength(8)
    verifyPassword: string;
}