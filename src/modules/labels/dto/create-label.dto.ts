import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class CreateLabelDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  info: string;

  @IsOptional()
  creator: User;
}
