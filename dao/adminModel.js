const pool = require("./connection");

const getAdminByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM admin WHERE email = ?';
    const result = await pool.query(sql, [email]);

    console.log(result)

    return result[0];
  }
  catch (error) {
    console.log(error);
  }
}

const getAdminById = async (id) => {
  try {
    const sql = 'SELECT * FROM admin WHERE id = ?';
    const result = await pool.query(sql, [id]);

    return result[0];
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAdminByEmail,
  getAdminById
}
