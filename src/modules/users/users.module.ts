import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { IsUserAlreadyExistConstraint } from '../../validation/IsUserExist';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [IsUserAlreadyExistConstraint, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
