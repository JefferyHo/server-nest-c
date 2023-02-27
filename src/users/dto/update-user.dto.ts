import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsMobilePhone(
    'zh-CN',
    {},
    {
      message: 'phone is invalid',
    },
  )
  phone?: string;

  @IsOptional()
  description: string;
}
