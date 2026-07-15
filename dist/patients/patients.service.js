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
var PatientsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let PatientsService = PatientsService_1 = class PatientsService {
    db;
    logger = new common_1.Logger(PatientsService_1.name);
    constructor(db) {
        this.db = db;
    }
    padString(str, targetLength) {
        const base = str || 'Patient diagnostic record note.';
        if (base.length >= targetLength)
            return base.substring(0, targetLength);
        const repeats = Math.ceil((targetLength - base.length) / 50) + 1;
        const padding = ' - Padded payload data to simulate heavy load for thesis. '.repeat(repeats);
        return (base + padding).substring(0, targetLength);
    }
    async findAll(limit, detailed) {
        const queryLimit = limit && limit > 0 ? limit : 1000;
        const sql = `SELECT * FROM patients LIMIT $1`;
        const rows = await this.db.query(sql, [queryLimit]);
        return rows.map((row) => {
            let notes = row.notes || '';
            if (detailed) {
                if (queryLimit <= 5) {
                    notes = this.padString(notes, 600);
                }
                else if (queryLimit <= 45) {
                    notes = this.padString(notes, 4000);
                }
                else {
                    notes = this.padString(notes, 4800);
                }
            }
            else {
                notes = notes.length > 20 ? notes.substring(0, 20) : notes;
            }
            return {
                id: row.id,
                name: row.name,
                age: row.age,
                gender: row.gender,
                condition: row.condition,
                status: row.status,
                notes: notes,
                medicalHistory: Array.isArray(row.medical_history) ? row.medical_history : [],
                prescriptions: Array.isArray(row.prescriptions) ? row.prescriptions : [],
                labReports: Array.isArray(row.lab_reports) ? row.lab_reports : [],
            };
        });
    }
    async create(input) {
        const name = input.name;
        const age = input.age;
        const gender = input.gender;
        const condition = input.condition;
        const status = input.status;
        const notes = input.notes || '';
        const medicalHistory = 'medicalHistory' in input ? input.medicalHistory || [] : [];
        const prescriptions = 'prescriptions' in input ? input.prescriptions || [] : [];
        const labReports = 'labReports' in input ? input.labReports || [] : [];
        const sql = `
      INSERT INTO patients (name, age, gender, condition, status, notes, medical_history, prescriptions, lab_reports)
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9::jsonb)
      RETURNING *
    `;
        const params = [
            name,
            age,
            gender,
            condition,
            status,
            notes,
            JSON.stringify(medicalHistory),
            JSON.stringify(prescriptions),
            JSON.stringify(labReports),
        ];
        const result = await this.db.query(sql, params);
        const row = result[0];
        return {
            id: row.id,
            name: row.name,
            age: row.age,
            gender: row.gender,
            condition: row.condition,
            status: row.status,
            notes: row.notes,
            medicalHistory: row.medical_history,
            prescriptions: row.prescriptions,
            labReports: row.lab_reports,
        };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = PatientsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map