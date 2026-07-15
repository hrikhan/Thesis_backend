import { DatabaseService } from '../database/database.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientRestDto } from './dto/create-patient-rest.dto';
import { CreatePatientInput } from './dto/create-patient.input';
export declare class PatientsService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private padString;
    findAll(limit?: number, detailed?: boolean): Promise<Patient[]>;
    create(input: CreatePatientRestDto | CreatePatientInput): Promise<Patient>;
}
