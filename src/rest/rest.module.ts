import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { ReportsModule } from '../reports/reports.module';
import { PatientsController } from './patients.controller';
import { ReportsController } from './reports.controller';

@Module({
  imports: [PatientsModule, ReportsModule],
  controllers: [PatientsController, ReportsController],
})
export class RestModule {}
