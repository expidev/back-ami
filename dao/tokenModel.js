const pool = require("./connection");

const create = async (email, token) => {

    const sql = `
        INSERT INTO tokens (
            token, 
            email, 
            created_at
        ) VALUES (?, ?, ?)
    `;
    const result =  await pool.query(sql, [token, email, new Date()])
    return result.insertId;
}

const findByToken = async (token) => {

    const sql = `
        SELECT * FROM tokens 
        WHERE token = ?
    `;
    const result =  await pool.query(sql, [token])
    return result[0];
}

module.exports = { create, findByToken }