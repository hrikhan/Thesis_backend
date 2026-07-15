import { PatientsService } from '../patients/patients.service';
import { CreatePatientRestDto } from '../patients/dto/create-patient-rest.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(limit?: string, detailed?: string): Promise<import("../patients/entities/patient.entity").Patient[]>;
    create(createPatientDto: CreatePatientRestDto): Promise<import("../patients/entities/patient.entity").Patient>;
}
