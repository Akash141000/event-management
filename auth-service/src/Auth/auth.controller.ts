import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Get,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth.service';
import { AuthType, ROLE_TYPE } from 'src/util/types';
import { UserService } from './user.service';
import { OrganiserService } from 'src/Auth/organiser.service';
import { Organiser } from './model/organiser.model';
import { User } from './model/user.model';
import { JwtAuthGuard } from 'src/auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _organiserService: OrganiserService,
  ) {}


  @Get('hello')
  hello(){
    return 'hello';
  }

  @ApiResponse({})
  @Post('signup')
  async signup(
    @Body() signupDto:SignupDto,
    @Query('type') roleType: ROLE_TYPE,
  ) {
    const {username,email,password,confirmPassword}  = signupDto;
    if (
      !(username && email && password && confirmPassword) &&
      password !== confirmPassword
    ) {
      throw new BadRequestException();
    }
    let entity;
    if (roleType === ROLE_TYPE.USER) {
      entity = await this._userService.find(email);
    } else {
      entity = await this._organiserService.find(email);
    }
    if (entity) {
      throw new BadRequestException('User already exists!');
    }
    if (roleType === ROLE_TYPE.USER) {
      const user = await this._userService.insert(
        email,
        username,
        password,
        confirmPassword,
      );
      if (!user) {
        throw new InternalServerErrorException();
      }
      return { response: 'User created successfully',data:user };
    } else {
      const organiser = await this._organiserService.insert(
        email,
        username,
        password,
        confirmPassword,
      );
      if (!organiser) {
        throw new InternalServerErrorException();
      }
      return { response: 'Organiser created successfully',data:organiser };
    }
  }

  @ApiResponse({})
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto:LoginDto,
    @Query('type') roleType: ROLE_TYPE,
  ) {
    const {email,password} = loginDto;
    if (!(email && password)) {
      throw new BadRequestException();
    }
    let entity: Organiser | User;
    if (roleType === ROLE_TYPE.USER) {
      entity = await this._userService.find(email);
    } else {
      entity = await this._organiserService.find(email);
    }
    if (!entity) {
      throw new NotFoundException();
    }

    let isTrue: boolean = false;

    if (roleType === ROLE_TYPE.USER) {
      isTrue = await this._userService.compare(password);
    } else {
      isTrue = await this._organiserService.compare(password);
    }

    if (!isTrue) {
      throw new UnauthorizedException();
    }
    const generatedToken = this._authService.getToken(
      entity instanceof User ? entity.userId : entity.organiserId,
      entity.email,
      AuthType.user,
    );

    if (roleType === ROLE_TYPE.USER) {
       await this._userService.logginUser();
    } else {
       await this._organiserService.logginOrganiser();
    }

    return { response: generatedToken,data:entity };
  }

  @UseGuards(JwtAuthGuard)
  @Post('auto-login')
  @HttpCode(200)
  async autoLogin(@Body('type') type: AuthType) {
    return true;
  }
}
