import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { checkAction } from '../validation/checkAction';

export class CreateLogDto {
  @IsNotEmpty()
  tableName: string;

  @IsNotEmpty()
  tableId: bigint;

  @IsIn([0, 1, 2])
  type: number;

  @IsNotEmpty()
  oldData: string;

  @checkAction()
  newData: string;

  @IsOptional()
  costTime: number;

  @IsNotEmpty()
  ipAddr: string;

  @IsNotEmpty()
  operator: string;
}
