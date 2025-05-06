// server.js
const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', authRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
