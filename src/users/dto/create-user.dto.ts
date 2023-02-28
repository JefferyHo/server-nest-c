import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IsUserAlreadyExist } from '../../validation/IsUserExist';

export class CreateUserDto {
  @IsUserAlreadyExist({
    context: 'userName',
    message: 'User $value already exists. choose another name.',
  })
  @IsNotEmpty({ message: 'username should not be empty' })
  userName: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  userPwd: string;

  @IsUserAlreadyExist({
    context: 'email',
    message: 'Email $value already exists.',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsMobilePhone(
    'zh-CN',
    {},
    {
      message: 'phone is invalid',
    },
  )
  @ValidateIf((e) => e.phone !== '' && e.phone !== undefined)
  phone?: string;

  @IsOptional()
  description: string;
}
