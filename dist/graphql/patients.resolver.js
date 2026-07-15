"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const patients_service_1 = require("../patients/patients.service");
const patient_entity_1 = require("../patients/entities/patient.entity");
const create_patient_input_1 = require("../patients/dto/create-patient.input");
let PatientsResolver = class PatientsResolver {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async getPatients(limit, detailed) {
        return this.patientsService.findAll(limit, detailed);
    }
    async createPatient(input) {
        return this.patientsService.create(input);
    }
};
exports.PatientsResolver = PatientsResolver;
__decorate([
    (0, graphql_1.Query)(() => [patient_entity_1.Patient], { name: 'patients' }),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('detailed', { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "getPatients", null);
__decorate([
    (0, graphql_1.Mutation)(() => patient_entity_1.Patient, { name: 'createPatient' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_input_1.CreatePatientInput]),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "createPatient", null);
exports.PatientsResolver = PatientsResolver = __decorate([
    (0, graphql_1.Resolver)(() => patient_entity_1.Patient),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsResolver);
//# sourceMappingURL=patients.resolver.js.map