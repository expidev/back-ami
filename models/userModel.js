const pool = require("../database/connection");

const getUserByEmail = async (email) => {
  try {

    const sql = `
      SELECT id_user, email, password_hash FROM dao_user 
      WHERE email = ?
    `;
    const result = await pool.query(sql, [email]);

    return result[0];
  }
  catch (error) {
    console.log(error);
  }
}

const createUser = async (email, hashedPassword, type) => {
  try {
    const sql = `
      INSERT INTO dao_user (email, password_hash, type)
      VALUE(?, ?, ?)
    `;
    await pool.query(sql, [email, hashedPassword, type]);
  }
  catch (error) {
    console.log(error);
  }
}

const getAdminById = async (id) => {
  try {
    const sql = 'SELECT * FROM dao_user WHERE id = ? AND type = "admin"';
    const result = await pool.query(sql, [id]);

    return result[0];
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUserByEmail,
  getAdminById,
  createUser
}
