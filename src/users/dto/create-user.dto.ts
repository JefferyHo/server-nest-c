import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsDefined,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username should not be empty' })
  userName: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  userPwd: string;

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
