const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4)',
      [nombre, correo, hashedPassword, rol]
    );
    res.redirect('/login.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(contraseña, user.contraseña);
      if (match) {
        if (user.rol === 'administrador') {
          return res.redirect('/admin.html');
        } else {
          return res.redirect('/atleta.html');
        }
      }
    }
    res.send('Credenciales incorrectas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el login');
  }
});

module.exports = router;
