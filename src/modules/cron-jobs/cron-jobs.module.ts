import { Module } from '@nestjs/common';
import { EmployeeJob } from './employee-job.service';
import { EmployeesService } from '@modules/employees/services';

@Module({
  providers: [EmployeeJob, EmployeesService],
})
export class CronJobsModule {}
