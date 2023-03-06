import { IsNotEmpty } from 'class-validator';
import { IsUserAlreadyExist } from '../../../validation/IsUserExist';

export class RegisterUserDto {
  @IsUserAlreadyExist({
    context: 'userName',
    message: '用户名 $value 已存在，请重新输入',
  })
  @IsNotEmpty({ message: '请输入用户名' })
  userName: string;

  @IsNotEmpty({ message: '请输入密码' })
  userPwd: string;
}
