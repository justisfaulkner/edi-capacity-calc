import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'https://justisfaulkner.github.io/edi-capacity-calc/', // Allow only the frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Optional if using cookies or authorization headers
  });

  await app.listen(3000);
}
bootstrap();
