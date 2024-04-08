const pool = require("./connection");

const insertLog = async (id_ami, id_visiteur) => {

    const sql = `
        INSERT INTO telechargement (
            id_ami, 
            id_visiteur, 
            date_telechargement
        ) VALUES (?, ?, ?)
    `;
    const result =  await pool.query(sql, [id_ami, id_visiteur, new Date()])
    return result.insertId;
}

module.exports = { insertLog }