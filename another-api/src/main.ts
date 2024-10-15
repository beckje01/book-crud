import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Main for Another API

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
