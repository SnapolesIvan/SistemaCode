import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/crear-tabla', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        correo TEXT UNIQUE NOT NULL,
        contrasena TEXT NOT NULL,
        rol TEXT CHECK (rol IN ('atleta', 'admin')) NOT NULL
      );
    `);
    res.send('Tabla creada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear la tabla');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
