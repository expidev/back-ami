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

const findByEmail = async (email) => {

    const sql = `
        SELECT * FROM tokens 
        WHERE email = ?
    `;
    const result =  await pool.query(sql, [email])
    return result[0];
}

const update = async (id, token) => {

    const sql = `
        UPDATE tokens
        SET token = ?, created_at = ?
        WHERE id = ?
    `;
    const result =  await pool.query(sql, [token, new Date(), id])
    return result[0];
}

module.exports = { create, update, findByToken, findByEmail }