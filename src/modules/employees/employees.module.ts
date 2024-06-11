import { Module } from '@nestjs/common';
import { EmployeesController } from './controllers';

@Module({
  controllers: [EmployeesController],
})
export class EmployeesModule {}
