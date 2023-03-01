import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  HttpException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
export interface Pagination {
  page: number;
  size: number;
}
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() pagination: Pagination) {
    const [data, total] = await this.usersService.findAll(pagination);
    return {
      data,
      total,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.usersService.findOne(+id);

    if (res === null) {
      throw new BadRequestException('user not exist');
    }

    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data: any = await this.usersService.remove(+id);
    if (data.affected === 1) {
      return null;
    }

    Logger.error('--- delete user', JSON.stringify(data));
    throw new HttpException('fail to delete user', 500);
  }

  @Delete()
  async removePatch(@Query() query: any) {
    const ids = query.ids.split(',');
    try {
      await this.usersService.removePatch(ids);
      return null;
    } catch (e) {
      Logger.error('--- delete user patch', e);
      throw new HttpException('fail to delete user', 500);
    }
  }
}
