const pool = require("../database/connection");

const create = async (email, token) => {

    const sql = `
        INSERT INTO dao_token (
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
        SELECT * FROM dao_token 
        WHERE token = ?
    `;
    const result =  await pool.query(sql, [token])
    return result[0];
}

const findByEmail = async (email) => {

    const sql = `
        SELECT * FROM dao_token 
        WHERE email = ?
    `;
    const result =  await pool.query(sql, [email])
    return result[0];
}

const update = async (id, token) => {

    const sql = `
        UPDATE dao_token
        SET token = ?, created_at = ?
        WHERE id = ?
    `;
    const result =  await pool.query(sql, [token, new Date(), id])
    return result[0];
}

module.exports = { create, update, findByToken, findByEmail }