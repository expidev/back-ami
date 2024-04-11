const pool = require("./connection");

const getListByPage = async (page) => {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const sql = `
        SELECT * FROM ami
        LIMIT ? OFFSET ?
      `;

      return await pool.query(sql, [limit, offset]);
    } catch (error) {
      return error.message
    }
}

const countPage = async (page) => {
  try {
    const sql = `
      SELECT COUNT(*) count FROM ami
    `;

    return await pool.query(sql);
  } catch (error) {
    return error.message
  }
}

const getAmiById = async (id_ami) => {
  try {
    const sql = `
      SELECT * FROM ami WHERE id_ami = ?
    `;

    return await pool.query(sql, [id_ami]);
  } catch (error) {
    return error.message
  }
}

const removeAmiById = async (id_ami) => {
  try {
    const sql = `
      DELETE FROM ami WHERE id_ami = ?
    `;

    return await pool.query(sql, [id_ami]);
  } catch (error) {
    return error.message
  }
}

const searchAmiById = async (id_ami) => {
  try {
    const sql = `
      SELECT * FROM ami WHERE id_ami LIKE ?
    `;

    return await pool.query(sql, [`%${id_ami || ''}%`]);
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

module.exports =  { 
  getListByPage, 
  countPage, 
  getAmiById, 
  searchAmiById, 
  updateDescription, 
  addAmi,
  removeAmiById
};