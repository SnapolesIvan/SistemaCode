const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/db');

// Registro
router.post('/register', async (req, res) => {
  const { email, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO usuarios (email, password, rol) VALUES ($1, $2, $3)', [email, hashedPassword, rol]);
  res.redirect('/login.html');
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { id: user.id, email: user.email, rol: user.rol };
    return res.redirect(user.rol === 'admin' ? '/admin.html' : '/atletas.html');
  } else {
    res.send('Credenciales incorrectas');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

module.exports = router;
