import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity } from "typeorm";

export enum Role {
    Child = 'Child',
    Parents = 'Parents',
}

registerEnumType(Role, {name: 'Role'});

@InputType('UserInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class UserEntity {

    @Column({name: 'name', length: 20})
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    userName: string;

    @Column({name: 'email', unique:true})
    @Field((type) => String) // 필드의 타입: 문자열
    @IsEmail()
    userEmail: string;

    @Column({name: 'password'})
    @Field((type) => String)
    @MinLength(8)
    userPw: string;

    @Column({name: 'birthday'})
    @Field((type) => String)
    userBd: string;

    @Column({name: 'role', type: 'enum', enum: Role, default: Role.Child})
    @Field((type) => Role)
    @IsEnum(Role)
    userRole: Role;

    @Column({name: 'school'})
    @Field((type) => String)
    userSchool: string;
}
