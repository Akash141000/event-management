import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from './model/user.model';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth.service';
import { SharedModule } from 'src/shared.module';
import { Organiser } from './model/organiser.model';
import {JwtModule} from "@nestjs/jwt";
import { OrganiserService } from './organiser.service';

@Module({
  imports: [SharedModule,TypeOrmModule.forFeature([User,Organiser]),JwtModule.register({secret:process.env.JWT_SECRET})],
  controllers: [AuthController],
  providers: [UserService,AuthService,OrganiserService],
})
export class UserModule {}
