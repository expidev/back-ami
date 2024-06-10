const pool = require("../database/connection");

const insert = async (visiteurInfo) => {

    const sql = `
        INSERT INTO dao_visiteur (
            nom, 
            adresse,
            id_region,
            type,
            cin_nif,
            email,
            telephone1,
            telephone2,
            telephone3
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        SELECT * FROM dao_visiteur
        WHERE email= ?
    `;
    const result = await pool.query(sql, [email]);
    return result[0];
}

const getVisitorByToken = async (token) => {
    const sql = `
        SELECT v.type,
               v.id_visiteur, 
               v.nom,
               v.adresse,
               r.nom_region,
               v.cin_nif,
               v.email,
               v.telephone1,
               v.telephone2,
               v.telephone3
        FROM dao_visiteur v
        INNER JOIN region r ON r.id_region = v.id_region
        INNER JOIN dao_token t ON v.email = t.email
        WHERE t.token = ?
    `;
    const result = await pool.query(sql, [token]);
    return result[0];
}

const update = async (updateFields, id, count) => {
    const sql = `
        UPDATE dao_visiteur
        SET 
            nom = ?,
            adresse = ?,
            id_region = ?,
            type = ?,
            cin_nif = ?, 
            email = ?, 
            telephone1 = ?,
            telephone2 = ?,
            telephone3 = ?,
            count = ?
        WHERE id_visiteur = ?
    `;
    const result = await pool.query(sql, [...updateFields, count + 1, id]);
    return result[0];
}

module.exports = { insert, getVisitorById, getVisitorByEmail, getVisitorByToken, update }