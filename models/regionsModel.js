const pool = require("../database/connection");

const getRegions = async () => {
  try {

    const sql = 'SELECT id_region, nom_region FROM region ORDER BY nom_region';
    const result = await pool.query(sql);

    return result.map(item => ({id: item.id_region, label: item.nom_region}));
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRegions
}
