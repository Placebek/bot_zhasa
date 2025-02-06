import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;

  await app.listen(port, host);
  console.log(`Server is running on: http://${host}:${port}`);
}

bootstrap();
