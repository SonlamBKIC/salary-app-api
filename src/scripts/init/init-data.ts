import { bootstrapMongo } from '@infrastructures/mongoose';
import { config } from '../../config';
import { EmployeeMongoModel } from '@modules/employees/models';
import { SalaryPayFormEnum } from '@modules/employees/output';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}

export const initData = async () => {
  try {
    await bootstrapMongo(config);
  } catch (error) {
    console.error('Error connecting to mongo:', error);
    process.exit(1);
  }
  const employeeModel = EmployeeMongoModel;

  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    length: 3,
  };

  for (let i = 0; i < 100; i += 1) {
    const writeOps = [];

    let salaryPayType = SalaryPayFormEnum.MONTHLY;
    let salaryPayValue = 0;
    for (let j = 0; j < 1000; j += 1) {
      salaryPayType = getRandomArbitrary(0, 1) > 0 ? SalaryPayFormEnum.MONTHLY : SalaryPayFormEnum.DAILY;
      salaryPayValue = getRandomArbitrary(1, 10) * 500 * (salaryPayType === SalaryPayFormEnum.MONTHLY ? 30 : 1);

      writeOps.push({
        insertOne: {
          document: {
            name: uniqueNamesGenerator(customConfig),
            salaryPayForm: {
              type: salaryPayType,
              value: salaryPayValue,
            },
            accountValue: 0,
          },
        },
      });
    }

    await employeeModel.bulkWrite(writeOps);
  }

  process.exit(0);
};

initData();
