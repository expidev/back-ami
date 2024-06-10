const pool = require("../database/connection");

const countDownloadByAmi = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT COUNT(ref_ami) AS count FROM dao_telechargement
      WHERE date_telechargement >= ? AND date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(ref_ami) AS count FROM dao_telechargement
        WHERE ref_ami = ? AND date_telechargement >= ? AND date_telechargement <= ?
      `;
      params.unshift(ref_ami);
    }

    const [result] = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const countEntrepriseDownloadByAmi = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT COUNT(t.ref_ami) AS count FROM dao_telechargement t
      INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
      WHERE v.type = "entreprise" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(ref_ami) AS count FROM dao_telechargement t
        INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
        WHERE t.ref_ami = ? AND v.type = "entreprise" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
      `;
      params.unshift(ref_ami);
    }

    const [result] = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const countIndividuDownloadByAmi = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT COUNT(t.ref_ami) AS count FROM dao_telechargement t
      INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
      WHERE v.type = "individu" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(t.ref_ami) AS count FROM dao_telechargement t
        INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
        WHERE t.ref_ami = ? AND v.type = "individu" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
      `;
      params.unshift(ref_ami);
    }

    const [result] = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const countDownloadsByRegion = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT r.nom_region, COUNT(t.ref_ami) as count
      FROM dao_telechargement t
      INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
      INNER JOIN region r ON v.id_region = r.id_region
      WHERE t.date_telechargement >= ? AND t.date_telechargement <= ?
      GROUP BY r.nom_region;
      
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
      SELECT r.nom_region, COUNT(t.id_ami) as count
      FROM dao_telechargement t
      INNER JOIN dao_visiteur v ON v.id_visiteur = t.id_visiteur
      INNER JOIN region r ON  v.id_region = r.id_region 
      WHERE t.ref_ami = ? AND t.date_telechargement >= ? AND t.date_telechargement <= ?
      GROUP BY r.nom_region
      `;
      params.unshift(ref_ami);
    }

    const result = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  countDownloadByAmi,
  countEntrepriseDownloadByAmi,
  countIndividuDownloadByAmi,
  countDownloadsByRegion
}