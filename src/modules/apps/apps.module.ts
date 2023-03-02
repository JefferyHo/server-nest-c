import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';

@Module({
  controllers: [AppsController],
  imports: [TypeOrmModule.forFeature([App])],
  providers: [AppsService],
})
export class AppsModule {}
