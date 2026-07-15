import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientRestDto } from './dto/create-patient-rest.dto';
import { CreatePatientInput } from './dto/create-patient.input';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(private readonly db: DatabaseService) {}

  private padString(str: string | null, targetLength: number): string {
    const base = str || 'Patient diagnostic record note.';
    if (base.length >= targetLength) return base.substring(0, targetLength);
    const repeats = Math.ceil((targetLength - base.length) / 50) + 1;
    const padding = ' - Padded payload data to simulate heavy load for thesis. '.repeat(repeats);
    return (base + padding).substring(0, targetLength);
  }

  async findAll(limit?: number, detailed?: boolean): Promise<Patient[]> {
    const queryLimit = limit && limit > 0 ? limit : 1000;
    const sql = `SELECT * FROM patients LIMIT $1`;
    const rows = await this.db.query(sql, [queryLimit]);

    return rows.map((row) => {
      let notes = row.notes || '';
      
      if (detailed) {
        // Pad note dynamically based on payload size parameters
        if (queryLimit <= 5) {
          notes = this.padString(notes, 600); // Small payload (~5 KB total)
        } else if (queryLimit <= 45) {
          notes = this.padString(notes, 4000); // Medium payload (~200 KB total)
        } else {
          notes = this.padString(notes, 4800); // Large payload (~1.5 MB total)
        }
      } else {
        // Unpadded/minimal payload notes
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

  async create(input: CreatePatientRestDto | CreatePatientInput): Promise<Patient> {
    const name = input.name;
    const age = input.age;
    const gender = input.gender;
    const condition = input.condition;
    const status = input.status;
    const notes = input.notes || '';

    // If it's REST creation DTO, use provided list values. Otherwise, empty arrays.
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
}
