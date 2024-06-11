import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeesModule } from './modules/employees/employees.module';
import { CronJobsModule } from '@modules/cron-jobs/cron-jobs.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: config.redis,
    }),
    EmployeesModule,
    CronJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
