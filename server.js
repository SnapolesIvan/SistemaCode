import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;

  try {
    const hash = await bcrypt.hash(contrasena, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4)',
      [nombre, correo, hash, rol]
    );
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.send("Error al registrar");
  }
});

app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.send('Usuario no encontrado');
    }

    const usuario = result.rows[0];
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (isMatch) {
      if (usuario.rol === 'admin') {
        res.redirect('/admin.html');
      } else {
        res.redirect('/atleta.html');
      }
    } else {
      res.send('Contraseña incorrecta');
    }
  } catch (err) {
    console.error(err);
    res.send("Error al iniciar sesión");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

