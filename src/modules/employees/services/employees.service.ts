import { Injectable } from '@nestjs/common';
import { EmployeeEntity, SalaryPayFormEnum } from '../output';

@Injectable()
export class EmployeesService {
  constructor() {}

  recalculateEmployeeAccountValue(employee: EmployeeEntity): EmployeeEntity {
    const dailySalary = Math.floor(
      employee.salaryPayForm.value / (employee.salaryPayForm.type === SalaryPayFormEnum.MONTHLY ? 30 : 1),
    );
    const updatedEmployee: EmployeeEntity = {
      ...employee,
      accountValue: employee.accountValue + dailySalary,
    };

    return updatedEmployee;
  }
}
