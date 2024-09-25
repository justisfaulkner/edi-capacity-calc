import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';

@Injectable()
export class IntegrationService {
  private k = 0.15; // Overhead factor
  private t = 0.05; // Tax factor

  // Workflow times in hours
  private existingIntegrationTime = 3; // 3 hours per existing integration
  private newIntegrationTime = 16.5; // 16.5 hours per new integration

  // Calculate total time based on number of integrations
  calculateHours(
    existingIntegrations: number,
    newIntegrations: number,
    concurrentIntegrations: number,
  ) {
    const existingHours = this.useFormula({
      integrations: existingIntegrations,
      integrationTime: this.existingIntegrationTime,
      concurrentIntegrations: concurrentIntegrations,
    });
    const newHours = this.useFormula({
      integrations: newIntegrations,
      integrationTime: this.newIntegrationTime,
      concurrentIntegrations: concurrentIntegrations,
    });

    const totalHours = existingHours + newHours;

    return {
      existingHours,
      newHours,
      totalHours,
    };
  }

  useFormula({
    integrations,
    integrationTime,
    concurrentIntegrations,
  }: {
    integrations: number;
    integrationTime: number;
    concurrentIntegrations: number;
  }): number {
    return (
      integrations *
      integrationTime *
      (1 + this.k * Math.log10(concurrentIntegrations) * (1 + this.t))
    );
  }
}
