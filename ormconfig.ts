// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from './src/users/entities/user.entity';
// import *as dotenv from 'dotenv';

// dotenv.config();
// const config:TypeOrmModuleOptions = {
//     type: 'mysql', // 어떤 DB?
//     host: 'localhost', // DB host
//     port: 3306, // DB port
//     username: process.env.DB_USERNAME, 
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE, // 스키마 이름
//     entities: [ // 만들 테이블
//         User
//     ],
//     synchronize: false, // 테이블 생성?
//     autoLoadEntities: true, // entity를 자동 로드?
//     charset: 'utf8mb4',
//     logging: true,
//     keepConnectionAlive: true,
// }

// export = config;