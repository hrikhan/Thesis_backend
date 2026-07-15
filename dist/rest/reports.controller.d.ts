import { ReportsService } from '../reports/reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    findAll(limit?: string, detailed?: string): Promise<import("../reports/entities/report.entity").Report[]>;
}
