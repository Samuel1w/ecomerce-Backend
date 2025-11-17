import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // load .env first
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

