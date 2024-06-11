import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { EmployeeEntity, SalaryPayFormEnum } from '../output';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should increase account value correctly with MONTHLY salary pay form', () => {
    const employee: EmployeeEntity = {
      id: 'id-1',
      name: 'employee-1',
      salaryPayForm: {
        type: SalaryPayFormEnum.MONTHLY,
        value: 30000,
      },
      accountValue: 1000,
    };

    const updatedEmployee = service.recalculateEmployeeAccountValue(employee);

    expect(updatedEmployee.accountValue).toEqual(2000);
  });

  it('should increase account value correctly with DAILY salary pay form', () => {
    const employee: EmployeeEntity = {
      id: 'id-1',
      name: 'employee-1',
      salaryPayForm: {
        type: SalaryPayFormEnum.DAILY,
        value: 2000,
      },
      accountValue: 4000,
    };

    const updatedEmployee = service.recalculateEmployeeAccountValue(employee);

    expect(updatedEmployee.accountValue).toEqual(6000);
  });
});
