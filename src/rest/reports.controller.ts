import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('detailed') detailed?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedDetailed = detailed === 'true';
    return this.reportsService.findAll(parsedLimit, parsedDetailed);
  }
}
