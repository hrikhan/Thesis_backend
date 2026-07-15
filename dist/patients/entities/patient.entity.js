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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const graphql_1 = require("@nestjs/graphql");
const prescription_entity_1 = require("./prescription.entity");
const lab_report_entity_1 = require("./lab-report.entity");
let Patient = class Patient {
    id;
    name;
    age;
    gender;
    condition;
    status;
    notes;
    medicalHistory;
    prescriptions;
    labReports;
};
exports.Patient = Patient;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Patient.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Patient.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Patient.prototype, "condition", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Patient.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Patient.prototype, "medicalHistory", void 0);
__decorate([
    (0, graphql_1.Field)(() => [prescription_entity_1.Prescription]),
    __metadata("design:type", Array)
], Patient.prototype, "prescriptions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [lab_report_entity_1.LabReport]),
    __metadata("design:type", Array)
], Patient.prototype, "labReports", void 0);
exports.Patient = Patient = __decorate([
    (0, graphql_1.ObjectType)()
], Patient);
//# sourceMappingURL=patient.entity.js.map