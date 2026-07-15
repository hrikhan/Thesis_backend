import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { ReportsModule } from '../reports/reports.module';
import { PatientsResolver } from './patients.resolver';
import { ReportsResolver } from './reports.resolver';

@Module({
  imports: [PatientsModule, ReportsModule],
  providers: [PatientsResolver, ReportsResolver],
})
export class GraphqlModule {}
