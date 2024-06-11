import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeesModule } from './modules/employees/employees.module';
import { CronJobsModule } from '@modules/cron-jobs/cron-jobs.module';

@Module({
  imports: [ScheduleModule.forRoot(), EmployeesModule, CronJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
