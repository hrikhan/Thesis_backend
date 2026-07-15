import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  onModuleInit() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      this.logger.error('DATABASE_URL environment variable is not defined!');
      throw new Error('DATABASE_URL is required');
    }

    this.logger.log('Initializing PostgreSQL Connection Pool...');
    this.pool = new Pool({
      connectionString,
      ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false,
      max: 20, // Max clients in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle PostgreSQL client', err);
    });

    this.createTables();
  }

  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const start = Date.now();
    try {
      const res = await this.pool.query(text, params);
      const duration = Date.now() - start;
      this.logger.debug(`Executed query: ${text} | Duration: ${duration}ms`);
      return res.rows;
    } catch (err) {
      this.logger.error(`Failed to execute query: ${text}`, err);
      throw err;
    }
  }

  private async createTables() {
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
    } catch (err) {
      this.logger.error('Error creating database tables', err);
    }
  }

  async onModuleDestroy() {
    this.logger.log('Closing PostgreSQL Connection Pool...');
    await this.pool.end();
  }
}
