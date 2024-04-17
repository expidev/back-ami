const pool = require("./connection");

const getSuperviseurByAmi = async (id_ami) => {
  try {
    const sql = `
      SELECT * FROM superviseur WHERE id_ami = ?
    `;

    return await pool.query(sql, [id_ami]);
  } catch (error) {
    console.log(error.message) 
  }
}

const addSuperviseur = async (newEmail) => {
    try {
      const sql = `
        INSERT INTO superviseur (
            nom,
            email,
            id_ami
        )
        VALUES (?, ?, ?)
      `;

      return await pool.query(sql, [...newEmail]);
    } catch (error) {
      console.log(error.message) 
    }
}

const removeSuperviseur = async (id_superviseur) => {
    try {
      const sql = `
        DELETE FROM superviseur
        WHERE id = ?
      `;
  
      return await pool.query(sql, [id_superviseur]);
    } catch (error) {
      console.error(error.message)
    }
}

const removeSuperviseurByAmi = async (id_ami) => {
  try {
    const sql = `
      DELETE FROM superviseur
      WHERE id_ami = ?
    `;

    return await pool.query(sql, [id_ami]);
  } catch (error) {
    console.error(error.message)
  }
}

module.exports =  { getSuperviseurByAmi, removeSuperviseur, removeSuperviseurByAmi, addSuperviseur };