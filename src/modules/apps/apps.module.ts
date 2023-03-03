import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname, join } from 'path';

@Module({
  controllers: [AppsController],
  imports: [
    TypeOrmModule.forFeature([App]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../files'),
        filename: (_, file, cb) => {
          const prefix = extname(file.originalname);
          const base = basename(file.originalname, prefix);
          const filename = `${base}_${
            new Date().getTime() + extname(file.originalname)
          }`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  providers: [AppsService],
})
export class AppsModule {}
