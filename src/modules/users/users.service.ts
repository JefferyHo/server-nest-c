import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const entity = plainToClass(User, {
        userName: registerUserDto.username,
        userPwd: registerUserDto.password,
      });
      const res = await this.userRepository.save(entity);
      Logger.log(`用户自主注册, id = ${res.id}`);
      return res;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async create(createUserDto: CreateUserDto) {
    // if (await this.isNameExist(createUserDto.userName)) {
    //   throw new BadRequestException('用户名已存在');
    // }

    // if (await this.isEmailExist(createUserDto.email)) {
    //   throw new BadRequestException('邮箱已存在');
    // }

    try {
      const entity = plainToClass(User, createUserDto);
      const res = await this.userRepository.save(entity);
      Logger.log(`管理员添加用户, id = ${res.id}`);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return null;
  }

  async findAll(pagination) {
    const { page = 1, size = 10 } = pagination;
    const qb = this.userRepository.createQueryBuilder('user');
    return await qb
      .skip((page - 1) * 10)
      .take(size)
      .getManyAndCount();
  }

  async isExist(name: string, value: string | number) {
    const qb = this.userRepository.createQueryBuilder('user');
    return await qb
      .where({
        [name]: value,
      })
      .getOne();
  }

  // async isNameExist(name: string) {
  //   const qb = this.userRepository.createQueryBuilder('user');
  //   return await qb.having('user.userName = :name', { name }).getOne();
  // }

  // async isEmailExist(email: string) {
  //   const qb = this.userRepository.createQueryBuilder('user');
  //   return await qb.having('user.email = :email', { email }).getOne();
  // }

  async findOne(id: number) {
    const qb = this.userRepository.createQueryBuilder('user');
    return await qb.where('user.id = :id', { id }).getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const res = await this.userRepository.save({
        id,
        ...updateUserDto,
      });
      Logger.log(`success update user, id = ${id}`, updateUserDto);
    } catch (e) {
      throw new BadRequestException(e);
    }
    return null;
  }

  async remove(id: number) {
    return this.userRepository.delete({ id });
  }

  async removePatch(ids: string[]) {
    const entities = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids })
      .getMany();
    if (entities.length === 0) {
      throw new BadRequestException(
        `Some Entities not found, no changes applied!`,
      );
    }
    return this.userRepository.remove(entities);
  }

  async findOneByName(name: string) {
    const qb = this.userRepository.createQueryBuilder('user');
    return await qb
      .addSelect('user.userPwd')
      .where('user.userName = :name', { name })
      .getOne();
  }
}
