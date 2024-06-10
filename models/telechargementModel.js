const pool = require("../database/connection");

const insertTelechargement = async (ref_ami, id_visiteur) => {
    try {
        const sql = `
            INSERT INTO dao_telechargement (
                ref_ami, 
                id_visiteur, 
                date_telechargement
            ) VALUES (?, ?, ?)
        `;
        const result =  await pool.query(sql, [ref_ami, id_visiteur, new Date()])
        return result.insertId;
    } catch (error) {
        return error.message
    }
}

const getTelechargement = async (ref_ami, id_visiteur) => {
    try {
        const sql = `
            SELECT * FROM  dao_telechargement 
            WHERE ref_ami = ? AND id_visiteur = ?
        `;
        const result =  await pool.query(sql, [ref_ami, id_visiteur])
        return result[0];
    } catch (error) {
        return error.message
    }
}

const updateCount = async (ref_ami, id_visiteur, count) => {
    try {
        const sql = `
            UPDATE dao_telechargement
            SET count = ?
            WHERE ref_ami = ? AND id_visiteur = ?
        `;
        const result =  await pool.query(sql, [Number(count) + 1, ref_ami, id_visiteur])
    } catch (error) {
        return error.message
    }
}

module.exports = { insertTelechargement, getTelechargement, updateCount }