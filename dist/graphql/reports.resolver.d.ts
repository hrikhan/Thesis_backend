import { ReportsService } from '../reports/reports.service';
import { Report } from '../reports/entities/report.entity';
export declare class ReportsResolver {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getReports(limit?: number, detailed?: boolean): Promise<Report[]>;
}
