import { EmployeeMongoModel } from '@modules/employees/models';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Task } from './employee-account-value.processor';
import { config } from 'src/config';

@Injectable()
export class EmployeeJob {
  private readonly logger = new Logger(EmployeeJob.name);
  private readonly employeeModel = EmployeeMongoModel;

  constructor(@InjectQueue('employeeAccountValue') private readonly employeeAccountValueQueue: Queue) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateEmployeesAccountValue() {
    this.logger.log('Start updating employees account value!');

    const totalEmployeeNumber = await this.employeeModel.countDocuments({});
    const limit = config.updateJobBatchSize;
    let skip = 0;

    while (skip < totalEmployeeNumber) {
      await this.employeeAccountValueQueue.add(Task.DailyUpdate, {
        totalEmployeeNumber,
        limit,
        skip,
      });
      skip = skip + limit;
    }

    this.logger.log('All employees account job created!');
  }
}
