import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(
    (process.env.NODE_ENV === 'production') ? '.prod.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.dev.env'
  )
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
