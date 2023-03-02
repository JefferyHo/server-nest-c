import { IsNotEmpty, IsOptional } from 'class-validator';
import { Label } from 'src/modules/labels/entities/label.entity';
import { User } from 'src/modules/users/user.entity';

export class CreateAppDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  label: Label;

  @IsOptional()
  info: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  avatar: string;

  @IsOptional()
  creator: User;
}
