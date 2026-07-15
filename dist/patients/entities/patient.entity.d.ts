import { Prescription } from './prescription.entity';
import { LabReport } from './lab-report.entity';
export declare class Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    status: string;
    notes?: string;
    medicalHistory: string[];
    prescriptions: Prescription[];
    labReports: LabReport[];
}
