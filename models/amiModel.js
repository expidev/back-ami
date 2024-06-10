const pool = require("../database/connection");

const getListByPage = async (page) => {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const sql = `
        SELECT * FROM dao_ami
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
      SELECT COUNT(*) count FROM dao_ami
    `;

    return await pool.query(sql);
  } catch (error) {
    return error.message
  }
}

const getAmiByRef = async (ref_ami) => {
  try {
    const sql = `
      SELECT * FROM dao_ami WHERE ref_ami = ?
    `;

    return await pool.query(sql, [ref_ami]);
  } catch (error) {
    return error.message
  }
}

const removeAmiByRef = async (ref_ami) => {
  try {
    const sql = `
      DELETE FROM dao_ami WHERE ref_ami = ?
    `;

    return await pool.query(sql, [ref_ami]);
  } catch (error) {
    return error.message
  }
}

const searchAmiByRef = async (ref_ami) => {
  try {
    const sql = `
      SELECT * FROM dao_ami WHERE ref_ami LIKE ?
    `;

    return await pool.query(sql, [`%${ref_ami || ''}%`]);
  } catch (error) {
    return error.message
  }
}

const updateDescription = async (description, ref_ami) => {
  try {
    const sql = `
      UPDATE dao_ami SET description = ? WHERE ref_ami = ?
    `;

    return await pool.query(sql, [description, ref_ami]);
  } catch (error) {
    console.log(error.message);
  }
}

const addAmi = async (ami) => {
  try {
    const sql = `
      INSERT INTO dao_ami (
        ref_ami,
        id_admin,
        description,
        date_creation
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
  getAmiByRef, 
  searchAmiByRef, 
  updateDescription, 
  addAmi,
  removeAmiByRef
};