import mongoose, { Model, Schema } from 'mongoose';
import { mongooseLeanVirtuals } from 'mongoose-lean-virtuals';

interface MongooseModelInputOptions {
  connection?: mongoose.Connection;
  /** Note that change streams do not work unless you're connected to a MongoDB replica set. */
  changeStream?: (change: unknown) => void;
}

interface MongooseModelInput {
  name: string;
  schema: Schema;
  options?: MongooseModelInputOptions;
}

export class MongooseModelFactory {
  static compile<T>(input: MongooseModelInput): Model<T> {
    // add plugin lean virtuals
    input.schema.plugin(mongooseLeanVirtuals);

    let notDefaultConnection = false;
    if (input.options) {
      const { connection } = input.options;
      if (connection) {
        notDefaultConnection = true;
      }
    }
    const model = notDefaultConnection
      ? input.options?.connection?.model<T>(input.name, input.schema)
      : mongoose.model<T>(input.name, input.schema);

    if (!model) {
      throw new Error('Can not create Mongo model');
    }

    if (input.options?.changeStream) {
      model.watch().on('change', input.options?.changeStream);
    }

    return model;
  }

  static getNewId(): string {
    return new mongoose.mongo.ObjectId().toString();
  }
}
