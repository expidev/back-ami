const pool = require("./connection");

const insert = async (visiteurInfo) => {

    const sql = `
        INSERT INTO visiteur (
            nom, 
            prenom, 
            cin_nif, 
            email_entreprise, 
            telephone1,
            telephone2,
            telephone3
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
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

const getVisitorByEmail = async (email) => {
    const sql = `
        SELECT * FROM visiteur
        WHERE email_entreprise = ?
    `;
    const result = await pool.query(sql, [email]);
    return result[0];
}

const getVisitorByToken = async (token) => {
    const sql = `
        SELECT * FROM visiteur v
        INNER JOIN tokens t ON v.email_entreprise = t.email
        WHERE t.token = ?
    `;
    const result = await pool.query(sql, [token]);
    return result[0];
}

const updateCount = async (id, count) => {
    const sql = `
        UPDATE visiteur
        SET count = ?
        WHERE id_visiteur = ?
    `;
    const result = await pool.query(sql, [count + 1, id]);
    return result[0];
}

module.exports = { insert, getVisitorById, getVisitorByEmail, getVisitorByToken, updateCount }