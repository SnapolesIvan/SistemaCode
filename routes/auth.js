const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;
  try {
    if (!nombre || !correo || !contraseña || !rol) {
      return res.status(400).send('Todos los campos son obligatorios.');
    }

    const check = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (check.rows.length > 0) {
      return res.status(400).send('Correo ya registrado.');
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await pool.query('INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4)', [nombre, correo, hashedPassword, rol]);

    // Redirigir a la página según el rol
    res.redirect(`/${rol}.html`);
  } catch (error) {
    console.error('ERROR EN REGISTRO:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(contraseña, user.contraseña)) {
      req.session.user = { id: user.id, rol: user.rol };
      return res.redirect(`/${user.rol}.html`);
    } else {
      return res.status(401).send('Credenciales inválidas.');
    }
  } catch (error) {
    console.error('ERROR EN LOGIN:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;

