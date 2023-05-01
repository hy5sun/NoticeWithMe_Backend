import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";

export enum Role {
    Child = 'Child',
    Parents = 'Parents',
}

registerEnumType(Role, {name: 'Role'});

@InputType('UserInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class User {
    // @PrimaryGeneratedColumn({type:'int', name:'id'})
    // id: number;

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
    //@Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
    userPw: string;

    // @BeforeInsert() // 데이터가 데베에 삽입되기 전에 실행
    // @BeforeUpdate() // 데이터가 업데이트되기 전에 실행
    // async hashPassword(): Promise<void> { // 비밀번호 해싱
    //     if (this.userPw) {
    //         try {
    //             this.userPw = await bcrypt.hash(this.userPw, 10); // 해싱된 비번을 해당 변수에 할당, 랜덤 문자열 길이 10
    //         } catch(e) {
    //             console.error(e);
    //             throw new InternalServerErrorException();
    //         }
    //     }
    // }
    
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
