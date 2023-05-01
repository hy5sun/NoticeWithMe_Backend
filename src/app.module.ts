import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import *as ormconfig from 'ormconfig';
import { UsersService } from './users/users.service';


@Module({
  imports: [UsersModule],
    //TypeOrmModule.forRoot(ormconfig)
  controllers: [],
  providers: [],
})
export class AppModule {}
