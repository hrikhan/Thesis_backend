"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let DatabaseService = DatabaseService_1 = class DatabaseService {
    logger = new common_1.Logger(DatabaseService_1.name);
    pool;
    onModuleInit() {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            this.logger.error('DATABASE_URL environment variable is not defined!');
            throw new Error('DATABASE_URL is required');
        }
        this.logger.log('Initializing PostgreSQL Connection Pool...');
        this.pool = new pg_1.Pool({
            connectionString,
            ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech')
                ? { rejectUnauthorized: false }
                : false,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        });
        this.pool.on('error', (err) => {
            this.logger.error('Unexpected error on idle PostgreSQL client', err);
        });
        this.createTables();
    }
    async query(text, params) {
        const start = Date.now();
        try {
            const res = await this.pool.query(text, params);
            const duration = Date.now() - start;
            this.logger.debug(`Executed query: ${text} | Duration: ${duration}ms`);
            return res.rows;
        }
        catch (err) {
            this.logger.error(`Failed to execute query: ${text}`, err);
            throw err;
        }
    }
    async createTables() {
        const createPatientsTableSql = `
      CREATE TABLE IF NOT EXISTS patients (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(50) NOT NULL,
        condition VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        notes TEXT,
        medical_history JSONB NOT NULL DEFAULT '[]'::jsonb,
        prescriptions JSONB NOT NULL DEFAULT '[]'::jsonb,
        lab_reports JSONB NOT NULL DEFAULT '[]'::jsonb
      );
    `;
        const createReportsTableSql = `
      CREATE TABLE IF NOT EXISTS reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        patient_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        result_value VARCHAR(255) NOT NULL,
        reference_range VARCHAR(255) NOT NULL,
        technician VARCHAR(255) NOT NULL
      );
    `;
        try {
            this.logger.log('Creating database tables if they do not exist...');
            await this.query(createPatientsTableSql);
            await this.query(createReportsTableSql);
            this.logger.log('Database tables verified successfully.');
        }
        catch (err) {
            this.logger.error('Error creating database tables', err);
        }
    }
    async onModuleDestroy() {
        this.logger.log('Closing PostgreSQL Connection Pool...');
        await this.pool.end();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map