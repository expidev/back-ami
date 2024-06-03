const pool = require("./connection");

const getDistricts = async () => {
  try {

    const sql = 'SELECT id_district, nom_district FROM district ORDER BY nom_district';
    const result = await pool.query(sql);

    return result.map(item => ({id: item.id_district, label: item.nom_district}));
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getDistricts
}
  