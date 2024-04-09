const pool = require("./connection");

const insertLog = async (id_ami, id_visiteur) => {
    try {
        const sql = `
            INSERT INTO telechargement (
                id_ami, 
                id_visiteur, 
                date_telechargement
            ) VALUES (?, ?, ?)
        `;
        const result =  await pool.query(sql, [id_ami, id_visiteur, new Date()])
        return result.insertId;
    } catch (error) {
        return error.message
    }
}

const getLog = async (id_ami, id_visiteur) => {
    try {
        const sql = `
            SELECT * FROM  telechargement 
            WHERE id_ami = ? AND id_visiteur = ?
        `;
        const result =  await pool.query(sql, [id_ami, id_visiteur])
        return result[0];
    } catch (error) {
        return error.message
    }
}

const updateCount = async (id_ami, id_visiteur, count) => {
    try {
        const sql = `
            UPDATE telechargement
            SET count = ?
            WHERE id_ami = ? AND id_visiteur = ?
        `;
        const result =  await pool.query(sql, [Number(count) + 1, id_ami, id_visiteur])
    } catch (error) {
        return error.message
    }
}

module.exports = { insertLog, getLog, updateCount }