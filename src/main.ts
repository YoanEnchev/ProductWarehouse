import { NestFactory } from '@nestjs/core';
import { AppModule } from './backend/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.useStaticAssets(join(__dirname, '../../', 'public'));

  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
