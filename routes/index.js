const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const contactoRoutes = require('./contactoRoutes');
const userRoutes = require('./userRoutes');

// Definir prefijos para cada grupo de rutas
router.use('/auth', authRoutes);
router.use('/contacto', contactoRoutes);
router.use('/users', userRoutes);

module.exports = router;
