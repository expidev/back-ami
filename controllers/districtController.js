const districtsModel = require("../dao/districtsModel");

const getDistricts = async (req, res) => {
    try {
        const result = await districtsModel.getDistricts();
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

module.exports = { getDistricts }