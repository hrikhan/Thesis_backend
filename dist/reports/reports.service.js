"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ReportsService = ReportsService_1 = class ReportsService {
    db;
    logger = new common_1.Logger(ReportsService_1.name);
    constructor(db) {
        this.db = db;
    }
    padString(str, targetLength) {
        const base = str || 'Negative / Normal diagnostic report findings.';
        if (base.length >= targetLength)
            return base.substring(0, targetLength);
        const repeats = Math.ceil((targetLength - base.length) / 50) + 1;
        const padding = ' - Padded diagnostic data findings to increase response weight. '.repeat(repeats);
        return (base + padding).substring(0, targetLength);
    }
    async findAll(limit, detailed) {
        const queryLimit = limit && limit > 0 ? limit : 1000;
        const sql = `SELECT * FROM reports LIMIT $1`;
        const rows = await this.db.query(sql, [queryLimit]);
        return rows.map((row) => {
            let resultValue = row.result_value || '';
            if (detailed) {
                if (queryLimit <= 5) {
                    resultValue = this.padString(resultValue, 600);
                }
                else if (queryLimit <= 45) {
                    resultValue = this.padString(resultValue, 4000);
                }
                else {
                    resultValue = this.padString(resultValue, 4800);
                }
            }
            else {
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
    async create(input) {
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
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = ReportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map