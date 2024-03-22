const pool = require("./connection");

const insert = async (visiteurInfo) => {

    const sql = `
        INSERT INTO visiteur (
            nom, 
            prenom, 
            cin_nif, 
            email_entreprise, 
            telephone
        ) VALUES (?, ?, ?, ?, ?)
    `;
    const result =  await pool.query(sql, [...visiteurInfo])
    return result.insertId;
}

const getVisitorById = async (id_visiteur) => {
    const sql = `
        SELECT * FROM visiteur
        WHERE id_visiteur = ?
    `;
    const result = await pool.query(sql, [id_visiteur]);
    return result;
}

module.exports = { insert, getVisitorById }