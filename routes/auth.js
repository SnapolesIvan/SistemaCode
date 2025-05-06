const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../models/db');

router.post('/register', async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, password, rol) VALUES ($1, $2, $3, $4)',
      [nombre, correo, hashedPassword, rol]
    );
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.send('Error al registrar usuario');
  }
});

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      res.redirect(user.rol === 'admin' ? '/admin.html' : '/atletas.html');
    } else {
      res.send('Credenciales incorrectas');
    }
  } catch (err) {
    console.error(err);
    res.send('Error al iniciar sesión');
  }
});

module.exports = router;
