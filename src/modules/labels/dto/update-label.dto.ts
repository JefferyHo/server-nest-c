import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, ValidateIf } from 'class-validator';
import { CreateLabelDto } from './create-label.dto';

export class UpdateLabelDto extends PartialType(CreateLabelDto) {
  @IsOptional()
  name: string;

  info: string;
}
