import mongoose from 'mongoose';
import { MongooseModelFactory } from '@infrastructures/mongoose';
import { EmployeeEntity, SalaryPayFormEnum } from '../output';

const salaryPayFormSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: SalaryPayFormEnum,
    },
    value: Number,
  },
  { _id: false },
);

const employeeSchema = new mongoose.Schema({
  name: String,
  salaryPayForm: salaryPayFormSchema,
  accountValue: Number,
  createdAt: Date,
  lastModifiedAt: Date,
});

employeeSchema.index({ createdAt: 1 }).index({ lastModifiedAt: 1 }).index({
  name: 'text',
});

employeeSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.lastModifiedAt = now;
  next();
});

employeeSchema
  .virtual('id')
  .get(function () {
    return this._id;
  })
  .set(function (id: string) {
    this.set({ _id: id });
  });

export const EmployeeMongoModel = MongooseModelFactory.compile<EmployeeEntity>({
  name: 'employees',
  schema: employeeSchema,
});
