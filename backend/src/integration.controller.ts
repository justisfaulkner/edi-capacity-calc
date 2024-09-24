import { Controller, Post, Body } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('calculate')
  calculateIntegrationTime(
    @Body('existing') existing: number,
    @Body('new') newIntegrations: number,
    @Body('concurrent') concurrent: number,
  ) {
    const totalTime = this.integrationService.calculateTotalTime(
      existing,
      newIntegrations,
      concurrent,
    );
    return { totalTime };
  }
}
