import { IsNotEmpty, IsInt, IsString, IsOptional, IsArray, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class PrescriptionDto {
  @IsNotEmpty()
  @IsString()
  medication: string;

  @IsNotEmpty()
  @IsString()
  dosage: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;
}

class LabReportDto {
  @IsNotEmpty()
  @IsString()
  test: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}

export class CreatePatientRestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Stable', 'Critical'])
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicalHistory?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionDto)
  @IsOptional()
  prescriptions?: PrescriptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabReportDto)
  @IsOptional()
  labReports?: LabReportDto[];
}
