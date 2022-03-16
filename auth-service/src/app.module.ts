import { Module } from '@nestjs/common';
import { User } from './Auth/model/user.model';
import { Organiser } from './Auth/model/organiser.model';
import { UserModule } from './Auth/auth.module';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { SharedModule } from './shared.module';


const conn:TypeOrmModuleOptions = {
  type: "postgres",
  host:  process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User,Organiser],
  synchronize: true
} 


@Module({
  imports: [SharedModule,TypeOrmModule.forRoot(conn),UserModule],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
