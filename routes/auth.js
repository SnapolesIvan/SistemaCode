const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, correo, contrasena, tipo } = req.body;

  if (!nombre || !correo || !contrasena || !tipo) {
    return res.status(400).send('Faltan datos');
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, tipo) VALUES ($1, $2, $3, $4)',
      [nombre, correo, hashedPassword, tipo]
    );
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el registro');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(contrasena, user.contrasena)) {
      if (user.tipo === 'admin') {
        res.redirect('/admin.html');
      } else {
        res.redirect('/atleta.html');
      }
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el login');
  }
});

module.exports = router;
