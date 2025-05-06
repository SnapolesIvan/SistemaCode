// ==== db.js ====
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:JHEfVlEQFDqqNvJbQfVCLxJsBCeIzXLI@postgres.railway.internal:5432/railway'
});

module.exports = pool;
