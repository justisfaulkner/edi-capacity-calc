import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow only the frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Optional if using cookies or authorization headers
  });

  await app.listen(3000);
}
bootstrap();
