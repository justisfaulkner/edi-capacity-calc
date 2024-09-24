import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';

@Module({
  imports: [],
  controllers: [AppController, IntegrationController],
  providers: [AppService, IntegrationService],
})
export class AppModule {}
