import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  BadRequestException,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  async create(@Request() req, @Body() createLabelDto: CreateLabelDto) {
    if (await this.labelsService.findOneByName(createLabelDto.name)) {
      throw new BadRequestException('label name is already exist');
    }

    return this.labelsService.create({
      ...createLabelDto,
      creator: req.user.userId,
    });
  }

  @Get()
  findAll(@Request() req) {
    return this.labelsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelsService.update(+id, updateLabelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { affected } = await this.labelsService.remove(+id);
    if (affected === 1) {
      return null;
    }
    throw new BadRequestException('id not exist');
  }
}
