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
exports.ReportsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reports_service_1 = require("../reports/reports.service");
const report_entity_1 = require("../reports/entities/report.entity");
let ReportsResolver = class ReportsResolver {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getReports(limit, detailed) {
        return this.reportsService.findAll(limit, detailed);
    }
};
exports.ReportsResolver = ReportsResolver;
__decorate([
    (0, graphql_1.Query)(() => [report_entity_1.Report], { name: 'reports' }),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('detailed', { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], ReportsResolver.prototype, "getReports", null);
exports.ReportsResolver = ReportsResolver = __decorate([
    (0, graphql_1.Resolver)(() => report_entity_1.Report),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsResolver);
//# sourceMappingURL=reports.resolver.js.map