// models/Seguimiento.js
const db = require('./db');

module.exports = {
  async getSeguimientoPorUsuario(id_usuario) {
    const result = await db.query('SELECT * FROM seguimiento WHERE id_usuario = $1', [id_usuario]);
    return result.rows;
  },

  async crearSeguimiento({ id_usuario, tipo, descripcion, fecha }) {
    const result = await db.query(
      'INSERT INTO seguimiento (id_usuario, tipo, descripcion, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuario, tipo, descripcion, fecha]
    );
    return result.rows[0];
  }
};
