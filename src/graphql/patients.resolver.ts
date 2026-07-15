import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/entities/patient.entity';
import { CreatePatientInput } from '../patients/dto/create-patient.input';

@Resolver(() => Patient)
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Query(() => [Patient], { name: 'patients' })
  async getPatients(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('detailed', { type: () => Boolean, nullable: true }) detailed?: boolean,
  ) {
    return this.patientsService.findAll(limit, detailed);
  }

  @Mutation(() => Patient, { name: 'createPatient' })
  async createPatient(
    @Args('input') input: CreatePatientInput,
  ) {
    return this.patientsService.create(input);
  }
}
