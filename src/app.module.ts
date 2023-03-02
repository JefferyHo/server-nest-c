import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { LogModule } from './modules/log/log.module';
import { AppsModule } from './modules/apps/apps.module';
import { LabelsModule } from './modules/labels/labels.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456aa',
      database: 'aigc',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
    UsersModule,
    AuthModule,
    // LogModule,
    AppsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
