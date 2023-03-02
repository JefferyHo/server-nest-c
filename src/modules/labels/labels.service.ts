import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label) private labelRepository: Repository<Label>,
  ) {}

  create(createLabelDto: CreateLabelDto) {
    return this.labelRepository.save(createLabelDto);
  }

  findAll(userId: number) {
    return this.labelRepository
      .createQueryBuilder('label')
      .where('creatorId = :userId', { userId })
      .getMany();
  }

  findOne(id: number) {
    return this.labelRepository
      .createQueryBuilder('label')
      .where('label.id = :id', { id })
      .getOneOrFail();
  }

  findOneByName(name: string) {
    return this.labelRepository
      .createQueryBuilder('label')
      .where('label.name = :name', { name })
      .getOne();
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return this.labelRepository.save({
      id,
      ...updateLabelDto,
    });
  }

  remove(id: number) {
    return this.labelRepository.delete({ id });
  }
}
