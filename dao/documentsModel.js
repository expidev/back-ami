const pool = require("./connection");


const insert = async (document_info) => {
    try {
      const sql = `
        INSERT INTO fichier (
            id_admin, 
            id_ami, 
            nom_fichier, 
            type_fichier, 
            taille_fichier, 
            date_upload
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;

      const result = await pool.query(sql, [...document_info]);
      return result.insertId;
    } catch (error) {
      return error.message
    }
}

const getListByAmi = async (id_ami) => {
    try {
      const sql = `
        SELECT * FROM fichier
        WHERE id_ami = ?
      `;
      return await pool.query(sql, [id_ami]);
    } catch (error) {
      return error.message
    }
}

const removeDocument = async (id_fichier) => {
  try {
    const sql = `
      DELETE FROM fichier
      WHERE id_fichier = ?
    `;

    return await pool.query(sql, [id_fichier]);
  } catch (error) {
    return error.message
  }
}

module.exports =  { insert, getListByAmi, removeDocument };