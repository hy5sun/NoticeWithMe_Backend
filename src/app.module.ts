import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env', //`.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: 'dev',
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 어떤 DB?
      host: process.env.DB_HOST, // DB host
      port: +process.env.DB_PORT, // DB port
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE, // 스키마 이름
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      synchronize: false, // 테이블 생성?
      autoLoadEntities: true, // entity를 자동 로드?
      charset: 'utf8mb4',
      logging: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
