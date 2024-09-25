import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

async function bootstrap() {
  console.log("Starting application...");
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3001',
    'https://justisfaulkner.github.io',
  ];
  // Enable CORS
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Optional if using cookies or authorization headers
  });

  await app.listen(3000);
  console.log("Application created.");
}
bootstrap();
