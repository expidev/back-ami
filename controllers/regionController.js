const regionsModel = require("../dao/regionsModel");

const getRegions = async (req, res) => {
    try {
        const result = await regionsModel.getRegions();
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

module.exports = { getRegions }