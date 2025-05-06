const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const ensureAuthenticated = require('./middlewares/authMiddleware');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false
}));

// Rutas públicas
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Páginas protegidas
app.get('/atletas.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'atletas.html'));
});

app.get('/admin.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
