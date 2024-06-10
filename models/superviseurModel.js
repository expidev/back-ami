const pool = require("../database/connection");

const getSuperviseurByAmi = async (ref_ami) => {
  try {
    const sql = `
      SELECT * FROM dao_superviseur WHERE ref_ami = ?
    `;

    return await pool.query(sql, [ref_ami]);
  } catch (error) {
    console.log(error.message) 
  }
}

const addSuperviseur = async (newEmail) => {
    try {
      const sql = `
        INSERT INTO dao_superviseur (
            nom,
            email,
            ref_ami
        )
        VALUES (?, ?, ?)
      `;

      return await pool.query(sql, [...newEmail]);
    } catch (error) {
      console.log(error.message) 
    }
}

const removeSuperviseur = async (id) => {
    try {
      const sql = `
        DELETE FROM dao_superviseur
        WHERE id_superviseur = ?
      `;
  
      return await pool.query(sql, [id]);
    } catch (error) {
      console.error(error.message)
    }
}

const removeSuperviseurByAmi = async (ref_ami) => {
  try {
    const sql = `
      DELETE FROM dao_superviseur
      WHERE ref_ami = ?
    `;

    return await pool.query(sql, [ref_ami]);
  } catch (error) {
    console.error(error.message)
  }
}

module.exports =  { getSuperviseurByAmi, removeSuperviseur, removeSuperviseurByAmi, addSuperviseur };