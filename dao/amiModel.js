const pool = require("./connection");

const getList = async () => {
    try {
      const sql = `
        SELECT * FROM ami
      `;

      return await pool.query(sql);
    } catch (error) {
      return error.message
    }
}

const getAmiById = async (id_ami) => {
  try {
    const sql = `
      SELECT * FROM ami WHERE id_ami LIKE ?
    `;

    return await pool.query(sql, [`%${id_ami}%`]);
  } catch (error) {
    return error.message
  }
}

const updateDescription = async (description, id_ami) => {
  try {
    const sql = `
      UPDATE ami SET description = ? WHERE id_ami = ?
    `;

    return await pool.query(sql, [description, id_ami]);
  } catch (error) {
    return error.message
  }
}

const addAmi = async (ami) => {
  try {
    const sql = `
      INSERT INTO ami (
        id_ami,
        id_admin,
        description,
        date_validation
      ) VALUES (?, ?, ?, ?)
    `;

    return await pool.query(sql, [...ami]);
  } catch (error) {
    return error.message
  }
}

module.exports =  { getList, getAmiById, updateDescription, addAmi };