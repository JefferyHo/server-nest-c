import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  @Cron('30 * * * * *')
  handleCron() {
    // check gitlab
    this.logger.debug('Called when the current second is 30');
  }
}
