"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlModule = void 0;
const common_1 = require("@nestjs/common");
const patients_module_1 = require("../patients/patients.module");
const reports_module_1 = require("../reports/reports.module");
const patients_resolver_1 = require("./patients.resolver");
const reports_resolver_1 = require("./reports.resolver");
let GraphqlModule = class GraphqlModule {
};
exports.GraphqlModule = GraphqlModule;
exports.GraphqlModule = GraphqlModule = __decorate([
    (0, common_1.Module)({
        imports: [patients_module_1.PatientsModule, reports_module_1.ReportsModule],
        providers: [patients_resolver_1.PatientsResolver, reports_resolver_1.ReportsResolver],
    })
], GraphqlModule);
//# sourceMappingURL=graphql.module.js.map