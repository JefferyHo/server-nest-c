import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppsModule } from './modules/apps/apps.module';
import { LabelsModule } from './modules/labels/labels.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constant';
import { JwtStrategy } from './auth/jwt.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedules/schedule.service';
import { ChatModule } from './modules/chat/chat.module';
import { ChatService } from './modules/chat/chat.service';
import { HttpModule } from '@nestjs/axios';
// import { ChatGateway } from './modules/chat/chat.gateway.web';
import { AgentModule } from './modules/agent/agent.module';

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
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '8h',
      },
    }),
    UsersModule,
    AuthModule,
    // LogModule,
    AppsModule,
    LabelsModule,
    ScheduleModule.forRoot(),
    ChatModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService, ChatService],
})
export class AppModule {}
