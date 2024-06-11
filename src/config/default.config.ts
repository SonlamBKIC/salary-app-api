// import process from 'process';
import { config } from 'dotenv';
config();

export interface Config {
  appName: string;
  tenant: string;
  environment: string;
  port: number;
  socketPort: number;
  mongo: {
    debug: boolean;
    connectionString: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  updateJobBatchSize: number;
  jobProcessorConcurrency: number;
}

export const defaultConfig: Config = {
  appName: process.env.APP_NAME || 'salary-app-api',
  tenant: process.env.TENANT || 'single',
  environment: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  socketPort: Number(process.env.SOCKET_PORT) || 3001,
  mongo: {
    debug: !!process.env.MONGO_DEBUG || false,
    connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/salary-app',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  updateJobBatchSize: Number(process.env.UPDATE_JOB_BATCH_SIZE) || 1000,
  jobProcessorConcurrency: Number(process.env.JOB_PROCESSOR_CONCURRENCY) || 5,
};
