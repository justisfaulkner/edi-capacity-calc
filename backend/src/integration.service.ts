import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {
  private k = 0.15; // Overhead factor
  private t = 0.05; // Tax factor

  // Workflow times in hours
  private existingIntegrationTime = 3; // 3 hours per existing integration
  private newIntegrationTime = 16.5; // 16.5 hours per new integration

  // Calculate total time based on number of integrations
  calculateTotalTime(
    existingIntegrations: number,
    newIntegrations: number,
    concurrentIntegrations: number,
  ): number {
    const existingIntegrationHours =
      existingIntegrations * this.existingIntegrationTime;
    const newIntegrationHours = newIntegrations * this.newIntegrationTime;

    const projectTime = existingIntegrationHours + newIntegrationHours;

    // Formula for total time with overhead and tax
    const totalTime =
      projectTime *
      (1 + this.k * Math.log(concurrentIntegrations) * (1 + this.t));

    return totalTime;
  }
}
