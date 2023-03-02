import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@UseGuards(JwtAuthGuard)
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  async create(@Request() req, @Body() createAppDto: CreateAppDto) {
    if (await this.appsService.findOneByName(createAppDto.name)) {
      throw new BadRequestException('name is already exist');
    }
    return this.appsService.create({
      ...createAppDto,
      creator: req.user.userId,
    });
  }

  @Get()
  findAll(@Request() req) {
    return this.appsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.appsService.findOne(+id);
    if (!res) {
      throw new BadRequestException('app not exist');
    }

    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
    const app = await this.appsService.findOneByNameExId(updateAppDto.name, id);
    if (app) {
      throw new BadRequestException('name is already exist');
    }
    return this.appsService.update(+id, updateAppDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { affected } = await this.appsService.remove(+id);
    if (affected !== 1) {
      throw new BadRequestException('id not exist');
    }
    return null;
  }
}
