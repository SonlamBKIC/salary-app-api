import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { bootstrapMongo } from '@infrastructures/mongoose';

async function bootstrap() {
  await bootstrapMongo(config);
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(config.port);
  console.log(`>>> App running on port: ${config.port}`);
}
bootstrap().catch((err) => {
  console.error('>>> Bootstrap error', err);
});
