// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta POST para registrar usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, contrasena, tipo } = req.body;

  try {
    await db.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, tipo) VALUES ($1, $2, $3, $4)',
      [nombre, correo, contrasena, tipo]
    );
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar el usuario');
  }
});

module.exports = router;
