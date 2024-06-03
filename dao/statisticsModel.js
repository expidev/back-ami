const pool = require("./connection");

const countDownloadByAmi = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT COUNT(id_ami) AS count FROM telechargement
      WHERE date_telechargement >= ? AND date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(id_ami) AS count FROM telechargement
        WHERE id_ami = ? AND date_telechargement >= ? AND date_telechargement <= ?
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
      SELECT COUNT(t.id_ami) AS count FROM telechargement t
      INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
      WHERE v.type = "entreprise" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(t.id_ami) AS count FROM telechargement t
        INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
        WHERE t.id_ami = ? AND v.type = "entreprise" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
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
      SELECT COUNT(t.id_ami) AS count FROM telechargement t
      INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
      WHERE v.type = "individu" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
        SELECT COUNT(t.id_ami) AS count FROM telechargement t
        INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
        WHERE t.id_ami = ? AND v.type = "individu" AND t.date_telechargement >= ? AND t.date_telechargement <= ?
      `;
      params.unshift(ref_ami);
    }

    const [result] = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const countDownloadsByDistrict = async (ref_ami, startDate, endDate) => {
  try {
    let sql = `
      SELECT d.nom_district, r.nom_region, COUNT(t.id_ami) as count
      FROM telechargement t
      INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
      INNER JOIN district d ON v.id_district = d.id_district
      INNER JOIN region r ON d.id_region = r.id_region
      WHERE t.date_telechargement >= ? AND t.date_telechargement <= ?
      GROUP BY d.nom_district;
      
    `;
    const params = [startDate, endDate];

    if (ref_ami && ref_ami !== "Tout") {
      sql = `
      SELECT d.nom_district, r.nom_region, COUNT(t.id_ami) as count
      FROM telechargement t
      INNER JOIN visiteur v ON v.id_visiteur = t.id_visiteur
      INNER JOIN district d ON v.id_district = d.id_district
      INNER JOIN region r ON  d.id_region = r.id_region 
      WHERE t.id_ami = ? AND t.date_telechargement >= ? AND t.date_telechargement <= ?
      GROUP BY d.nom_district
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
  countDownloadsByDistrict 
}
