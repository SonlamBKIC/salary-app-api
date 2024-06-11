import mongoose from 'mongoose';

export interface MongoConfig {
  mongo: {
    connectionString: string;
    debug: boolean;
  };
}

export const bootstrapMongo = async (config: MongoConfig): Promise<void> => {
  await mongoose.connect(config.mongo.connectionString, {
    autoIndex: config.mongo.debug,
  });
  mongoose.set('debug', config.mongo.debug);
  // eslint-disable-next-line no-console
  console.log('>>> Connect mongo success!');
};

export const closeMongo = async (): Promise<void> => {
  await mongoose.disconnect();
  // eslint-disable-next-line no-console
  console.log('>>> Disconnect mongo success!');
};
