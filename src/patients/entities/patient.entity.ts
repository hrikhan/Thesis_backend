import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prescription } from './prescription.entity';
import { LabReport } from './lab-report.entity';

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  gender: string;

  @Field()
  condition: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => [String])
  medicalHistory: string[];

  @Field(() => [Prescription])
  prescriptions: Prescription[];

  @Field(() => [LabReport])
  labReports: LabReport[];
}
