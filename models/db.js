// models/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Railway ya lo inyecta
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
