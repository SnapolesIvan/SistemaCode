// models/Mensaje.js
const db = require('./db');

module.exports = {
  async obtenerMensajes() {
    const result = await db.query('SELECT * FROM mensajes ORDER BY fecha DESC');
    return result.rows;
  },

  async crearMensaje({ id_usuario, contenido, fecha }) {
    const result = await db.query(
      'INSERT INTO mensajes (id_usuario, contenido, fecha) VALUES ($1, $2, $3) RETURNING *',
      [id_usuario, contenido, fecha]
    );
    return result.rows[0];
  }
};
