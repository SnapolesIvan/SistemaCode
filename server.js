// server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz: sirve el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Aquí puedes agregar más rutas si usas rutas tipo /login, /registro, etc.
// Ejemplo:
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);

// Puerto para Railway o local
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
