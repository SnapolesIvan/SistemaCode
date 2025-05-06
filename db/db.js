import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://postgres:JHEfVlEQFDqqNvJbQfVCLxJsBCeIzXLI@postgres.railway.internal:5432/railway',
  ssl: { rejectUnauthorized: false }
});
