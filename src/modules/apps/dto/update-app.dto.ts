import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Label } from 'src/modules/labels/entities/label.entity';
import { CreateAppDto } from './create-app.dto';

export class UpdateAppDto extends PartialType(CreateAppDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  label: Label;

  @IsOptional()
  info: string;

  @IsOptional()
  url: string;

  @IsOptional()
  avatar: string;
}
