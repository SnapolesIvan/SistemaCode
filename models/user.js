// models/User.js
const db = require('./db');

module.exports = {
  async createUser({ nombre, correo, contraseña, rol }) {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, contraseña, rol]
    );
    return result.rows[0];
  },

  async findByCorreo(correo) {
    const result = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    return result.rows[0];
  }
};
