export enum SalaryPayFormEnum {
  MONTHLY = 'MONTHLY',
  DAILY = 'DAILY',
}

export interface SalaryPayForm {
  type: SalaryPayFormEnum;
  value: number;
}

export interface EmployeeEntity {
  id: string;
  name: string;
  salaryPayForm: SalaryPayForm;
  accountValue: number;
  createdAt?: Date;
  lastModifiedAt?: Date;
}
