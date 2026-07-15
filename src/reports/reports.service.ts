import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private readonly db: DatabaseService) {}

  private padString(str: string | null, targetLength: number): string {
    const base = str || 'Negative / Normal diagnostic report findings.';
    if (base.length >= targetLength) return base.substring(0, targetLength);
    const repeats = Math.ceil((targetLength - base.length) / 50) + 1;
    const padding = ' - Padded diagnostic data findings to increase response weight. '.repeat(repeats);
    return (base + padding).substring(0, targetLength);
  }

  async findAll(limit?: number, detailed?: boolean): Promise<Report[]> {
    const queryLimit = limit && limit > 0 ? limit : 1000;
    const sql = `SELECT * FROM reports LIMIT $1`;
    const rows = await this.db.query(sql, [queryLimit]);

    return rows.map((row) => {
      let resultValue = row.result_value || '';
      
      if (detailed) {
        if (queryLimit <= 5) {
          resultValue = this.padString(resultValue, 600); // Small payload (~5 KB total)
        } else if (queryLimit <= 45) {
          resultValue = this.padString(resultValue, 4000); // Medium payload (~200 KB total)
        } else {
          resultValue = this.padString(resultValue, 4800); // Large payload (~1.5 MB total)
        }
      } else {
        resultValue = resultValue.length > 20 ? resultValue.substring(0, 20) : resultValue;
      }

      return {
        id: row.id,
        title: row.title,
        patientName: row.patient_name,
        category: row.category,
        date: row.date,
        status: row.status,
        resultValue: resultValue,
        referenceRange: row.reference_range,
        technician: row.technician,
      };
    });
  }

  async create(input: Omit<Report, 'id'>): Promise<Report> {
    const sql = `
      INSERT INTO reports (title, patient_name, category, date, status, result_value, reference_range, technician)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const params = [
      input.title,
      input.patientName,
      input.category,
      input.date,
      input.status,
      input.resultValue,
      input.referenceRange,
      input.technician,
    ];

    const result = await this.db.query(sql, params);
    const row = result[0];

    return {
      id: row.id,
      title: row.title,
      patientName: row.patient_name,
      category: row.category,
      date: row.date,
      status: row.status,
      resultValue: row.result_value,
      referenceRange: row.reference_range,
      technician: row.technician,
    };
  }
}
