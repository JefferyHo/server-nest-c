import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterUserDto } from './modules/users/dto/register-user.dto';
import { UsersService } from './modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { isSame } from 'src/utils/encrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() user: RegisterUserDto) {
    let _user: any = await this.usersService.findOneByName(user.username);

    if (!_user) {
      _user = this.usersService.register(user);

      return {
        auto_register: 1,
        access_token: this.jwtService.sign({
          username: _user.userName,
          sub: _user.id,
        }),
      };
    }

    if (!isSame(user.password, _user.userPwd)) {
      throw new BadRequestException('password is incorrect');
    }

    return {
      access_token: this.jwtService.sign({
        username: _user.userName,
        sub: _user.id,
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
