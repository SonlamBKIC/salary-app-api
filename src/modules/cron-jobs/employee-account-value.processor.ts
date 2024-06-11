import { EmployeeMongoModel } from '@modules/employees/models';
import { EmployeesService } from '@modules/employees/services';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { config } from 'src/config';

export enum Task {
  DailyUpdate = 'daily-update',
  BonusUpdate = 'bonus-update',
}

@Processor('employeeAccountValue')
export class EmployeeAccountValueProcessor {
  private readonly logger = new Logger(EmployeeAccountValueProcessor.name);
  private readonly employeeModel = EmployeeMongoModel;

  constructor(private readonly employeesService: EmployeesService) {}

  @Process({
    name: Task.DailyUpdate,
    concurrency: config.jobProcessorConcurrency,
  })
  async dailyUpdateEmployeeAccountValue(job: Job) {
    const limit = job.data.limit;
    const skip = job.data.skip;

    if (!isNaN(limit) && !isNaN(skip)) {
      const employeesData = await this.employeeModel.find({}).limit(limit).skip(skip).batchSize(100);

      const writeOps = [];
      for (const employee of employeesData) {
        writeOps.push({
          updateOne: {
            filter: {
              _id: employee._id,
            },
            update: {
              accountValue: this.employeesService.recalculateEmployeeAccountValue(employee).accountValue,
            },
          },
        });
      }

      await this.employeeModel.bulkWrite(writeOps);
      this.logger.log(`Daily update employee account done for skip ${skip} and limit ${limit}`);
    }
  }
}
