import { EmployeeMongoModel } from '@modules/employees/models';
import { EmployeesService } from '@modules/employees/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EmployeeJob {
  private readonly logger = new Logger(EmployeeJob.name);
  private readonly employeeModel = EmployeeMongoModel;

  constructor(private readonly employeesService: EmployeesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateEmployeesAccountValue() {
    this.logger.log('Start updating employees account value');

    const limit = 1000;
    let skip = 0;
    let employeeResult = await this.employeeModel.find({}).limit(limit).skip(skip).batchSize(100);

    while (employeeResult.length > 0) {
      const writeOps = [];
      for (const employee of employeeResult) {
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

      skip += limit;
      employeeResult = await this.employeeModel.find({}).limit(limit).skip(skip).batchSize(100);
    }

    this.logger.log('All employees account value updated!');
  }
}
