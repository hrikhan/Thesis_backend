import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PatientsService } from '../patients/patients.service';
import { CreatePatientRestDto } from '../patients/dto/create-patient-rest.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('detailed') detailed?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedDetailed = detailed === 'true';
    return this.patientsService.findAll(parsedLimit, parsedDetailed);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createPatientDto: CreatePatientRestDto) {
    return this.patientsService.create(createPatientDto);
  }
}
