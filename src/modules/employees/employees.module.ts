import { Module } from '@nestjs/common';
import { EmployeesController } from './controllers';
import { EmployeesService } from './services';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
