import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    if (user && isSame(pass, user.userPwd)) {
      const { userPwd, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
