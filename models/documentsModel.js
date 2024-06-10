const pool = require("../database/connection");


const insert = async (document_info) => {
    try {
      const sql = `
        INSERT INTO dao_fichier (
            id_admin, 
            ref_ami, 
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

const getListByAmi = async (ref_ami) => {
    try {
      const sql = `
        SELECT * FROM dao_fichier
        WHERE ref_ami = ?
      `;
      return await pool.query(sql, [ref_ami]);
    } catch (error) {
      return error.message
    }
}

const removeDocument = async (id_fichier) => {
  try {
    const sql = `
      DELETE FROM dao_fichier
      WHERE id_fichier = ?
    `;

    return await pool.query(sql, [id_fichier]);
  } catch (error) {
    return error.message
  }
}

// remove all documents by the id_ami
const removeDocumentsByRefAmi = async (ref_ami) => {
  try {
    const sql = `
      DELETE FROM dao_fichier
      WHERE ref_ami = ?
    `;

    return await pool.query(sql, [ref_ami]);
  } catch (error) {
    return error.message
  }
}


module.exports =  { insert, getListByAmi, removeDocument, removeDocumentsByRefAmi };