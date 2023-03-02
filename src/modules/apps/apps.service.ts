import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App } from './entities/app.entity';

@Injectable()
export class AppsService {
  constructor(@InjectRepository(App) private appRepository: Repository<App>) {}
  create(createAppDto: CreateAppDto) {
    return this.appRepository.save(createAppDto);
  }

  findAll(userId: number) {
    return this.appRepository
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.label', 'label')
      .where('app.creatorId = :userId', { userId })
      .getMany();
  }

  findOne(id: number) {
    return this.appRepository
      .createQueryBuilder('app')
      .where('app.id = :id', { id })
      .getOne();
  }

  findOneByName(name: string) {
    return this.appRepository
      .createQueryBuilder('app')
      .where('app.name = :name', { name })
      .getOne();
  }

  findOneByNameExId(name: string, id: string) {
    return this.appRepository
      .createQueryBuilder('app')
      .where('app.name = :name', { name })
      .andWhere('app.id != :id', { id })
      .getOne();
  }

  update(id: number, updateAppDto: UpdateAppDto) {
    return this.appRepository.save({
      id,
      ...updateAppDto,
    });
  }

  remove(id: number) {
    return this.appRepository.delete({ id });
  }
}
