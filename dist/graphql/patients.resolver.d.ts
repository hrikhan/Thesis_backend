import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/entities/patient.entity';
import { CreatePatientInput } from '../patients/dto/create-patient.input';
export declare class PatientsResolver {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    getPatients(limit?: number, detailed?: boolean): Promise<Patient[]>;
    createPatient(input: CreatePatientInput): Promise<Patient>;
}
