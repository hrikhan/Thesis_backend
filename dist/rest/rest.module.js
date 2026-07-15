"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestModule = void 0;
const common_1 = require("@nestjs/common");
const patients_module_1 = require("../patients/patients.module");
const reports_module_1 = require("../reports/reports.module");
const patients_controller_1 = require("./patients.controller");
const reports_controller_1 = require("./reports.controller");
let RestModule = class RestModule {
};
exports.RestModule = RestModule;
exports.RestModule = RestModule = __decorate([
    (0, common_1.Module)({
        imports: [patients_module_1.PatientsModule, reports_module_1.ReportsModule],
        controllers: [patients_controller_1.PatientsController, reports_controller_1.ReportsController],
    })
], RestModule);
//# sourceMappingURL=rest.module.js.map