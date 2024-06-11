import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmployeeJob } from './employee-job.service';
import { EmployeesService } from '@modules/employees/services';
import { EmployeeAccountValueProcessor } from './employee-account-value.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'employeeAccountValue' })],
  providers: [EmployeeJob, EmployeesService, EmployeeAccountValueProcessor],
})
export class CronJobsModule {}
