import { DatabaseService } from '../database/database.service';
import { Report } from './entities/report.entity';
export declare class ReportsService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private padString;
    findAll(limit?: number, detailed?: boolean): Promise<Report[]>;
    create(input: Omit<Report, 'id'>): Promise<Report>;
}
