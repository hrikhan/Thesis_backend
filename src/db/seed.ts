import { Pool } from 'pg';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in env!');
  process.exit(1);
}

console.log('Connecting to database for seeding...');
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : false,
});

const conditions = ['Diabetes', 'Hypertension', 'Asthma', 'COVID-19', 'Heart Disease', 'Arthritis', 'Migraine', 'Anemia'];
const statuses = ['Stable', 'Critical'];
const genders = ['Male', 'Female', 'Other'];
const categories = ['Hematology', 'Biochemistry', 'Urinalysis', 'Endocrinology', 'Immunology'];
const reportStatuses = ['Completed', 'Pending'];

async function seed() {
  const start = Date.now();
  const client = await pool.connect();
  try {
    console.log('Creating database tables if they do not exist...');
    await client.query(`
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
    `);

    await client.query(`
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
    `);

    console.log('Clearing old data from patients and reports tables...');
    await client.query('TRUNCATE TABLE patients, reports RESTART IDENTITY;');

    // 1. Generate Patients (1010 records)
    console.log('Generating 1010 patients...');
    const patients: any[] = [];
    for (let i = 0; i < 1010; i++) {
      const name = faker.person.fullName();
      const age = faker.number.int({ min: 1, max: 95 });
      const gender = faker.helpers.arrayElement(genders);
      const condition = faker.helpers.arrayElement(conditions);
      const status = faker.helpers.arrayElement(statuses);
      const notes = faker.lorem.sentences(faker.number.int({ min: 1, max: 4 }));
      
      const medicalHistory = faker.helpers.arrayElements([
        'Family history of diabetes', 'Allergic to penicillin', 'Previous knee surgery',
        'High blood pressure', 'Smoker', 'Non-smoker', 'Allergic to pollen', 'Asthmatic in childhood'
      ], faker.number.int({ min: 1, max: 4 }));

      const prescriptions: any[] = [];
      const numPrescriptions = faker.number.int({ min: 0, max: 3 });
      for (let p = 0; p < numPrescriptions; p++) {
        prescriptions.push({
          medication: faker.helpers.arrayElement(['Metformin', 'Lisinopril', 'Albuterol', 'Amoxicillin', 'Atorvastatin', 'Ibuprofen', 'Omeprazole']),
          dosage: faker.helpers.arrayElement(['10mg', '500mg', '1 puff', '250mg', '20mg', '400mg', '40mg']),
          frequency: faker.helpers.arrayElement(['Once daily', 'Twice daily', 'As needed', 'Three times daily']),
        });
      }

      const labReports: any[] = [];
      const numLabReports = faker.number.int({ min: 0, max: 3 });
      for (let l = 0; l < numLabReports; l++) {
        labReports.push({
          test: faker.helpers.arrayElement(['Blood Sugar', 'Blood Pressure', 'Spirometry', 'CBC', 'Lipid Panel', 'Thyroid Screen']),
          result: faker.helpers.arrayElement(['Normal', 'High', 'Low', 'Borderline']),
          date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
        });
      }

      patients.push({
        name,
        age,
        gender,
        condition,
        status,
        notes,
        medicalHistory,
        prescriptions,
        labReports
      });
    }

    // Bulk insert patients in batches of 100
    const batchSize = 100;
    console.log(`Inserting patients in batches of ${batchSize}...`);
    for (let i = 0; i < patients.length; i += batchSize) {
      const batch = patients.slice(i, i + batchSize);
      const values: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      batch.forEach((p) => {
        values.push(`($${paramIndex}, $${paramIndex+1}, $${paramIndex+2}, $${paramIndex+3}, $${paramIndex+4}, $${paramIndex+5}, $${paramIndex+6}::jsonb, $${paramIndex+7}::jsonb, $${paramIndex+8}::jsonb)`);
        params.push(
          p.name,
          p.age,
          p.gender,
          p.condition,
          p.status,
          p.notes,
          JSON.stringify(p.medicalHistory),
          JSON.stringify(p.prescriptions),
          JSON.stringify(p.labReports)
        );
        paramIndex += 9;
      });

      const sql = `
        INSERT INTO patients (name, age, gender, condition, status, notes, medical_history, prescriptions, lab_reports)
        VALUES ${values.join(', ')}
      `;
      await client.query(sql, params);
    }
    console.log('Patients table populated successfully.');

    // 2. Generate Reports (550 records)
    console.log('Generating 550 reports...');
    const reports: any[] = [];
    for (let i = 0; i < 550; i++) {
      reports.push({
        title: faker.helpers.arrayElement(['Complete Blood Count', 'Metabolic Panel', 'Urinalysis', 'Lipid Panel', 'Thyroid Function Panel', 'Liver Panel']),
        patientName: faker.person.fullName(),
        category: faker.helpers.arrayElement(categories),
        date: faker.date.recent({ days: 15 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(reportStatuses),
        resultValue: faker.helpers.arrayElement(['14.2 g/dL', '98 mg/dL', '1.015', '180 mg/dL', '2.4 uIU/mL', 'Normal', 'Negative']),
        referenceRange: faker.helpers.arrayElement(['12.0 - 16.0 g/dL', '70 - 99 mg/dL', '1.005 - 1.030', '< 200 mg/dL', '0.4 - 4.0 uIU/mL', 'Normal range', 'Negative']),
        technician: faker.person.fullName(),
      });
    }

    console.log(`Inserting reports in batches of ${batchSize}...`);
    for (let i = 0; i < reports.length; i += batchSize) {
      const batch = reports.slice(i, i + batchSize);
      const values: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      batch.forEach((r) => {
        values.push(`($${paramIndex}, $${paramIndex+1}, $${paramIndex+2}, $${paramIndex+3}, $${paramIndex+4}, $${paramIndex+5}, $${paramIndex+6}, $${paramIndex+7})`);
        params.push(
          r.title,
          r.patientName,
          r.category,
          r.date,
          r.status,
          r.resultValue,
          r.referenceRange,
          r.technician
        );
        paramIndex += 8;
      });

      const sql = `
        INSERT INTO reports (title, patient_name, category, date, status, result_value, reference_range, technician)
        VALUES ${values.join(', ')}
      `;
      await client.query(sql, params);
    }
    console.log('Reports table populated successfully.');

    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`Seeding completed successfully in ${duration}s!`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
