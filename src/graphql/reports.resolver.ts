import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ReportsService } from '../reports/reports.service';
import { Report } from '../reports/entities/report.entity';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Query(() => [Report], { name: 'reports' })
  async getReports(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('detailed', { type: () => Boolean, nullable: true }) detailed?: boolean,
  ) {
    return this.reportsService.findAll(limit, detailed);
  }
}
