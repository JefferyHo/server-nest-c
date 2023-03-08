import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { isSame } from 'src/utils/encrypt';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userServie: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userServie.findOneByName(username);

    if (!user) {
      throw new BadRequestException('usename is incorrect');
    }

    if (!isSame(pass, user.userPwd)) {
      throw new BadRequestException('password is incorrect');
    }

    const { userPwd, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
