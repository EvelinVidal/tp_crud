import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(3010);
  Logger.log(`Server is running in localhost ${await app.getUrl()} `) // muestra en la consola el puerto en el que está corriendo el server.
}
bootstrap();
