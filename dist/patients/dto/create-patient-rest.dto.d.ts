declare class PrescriptionDto {
    medication: string;
    dosage: string;
    frequency: string;
}
declare class LabReportDto {
    test: string;
    result: string;
    date: string;
}
export declare class CreatePatientRestDto {
    name: string;
    age: number;
    gender: string;
    condition: string;
    status: string;
    notes?: string;
    medicalHistory?: string[];
    prescriptions?: PrescriptionDto[];
    labReports?: LabReportDto[];
}
export {};
