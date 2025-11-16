import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // load .env first
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'Luxuria-db',
  password: process.env.PGPASSWORD || 'dalina05',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432, // convert to number
});

// Test connection
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ DB connection error:', err));
