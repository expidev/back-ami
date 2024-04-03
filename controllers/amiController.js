const amiModel = require("../dao/amiModel");

const getList = async (req, res) => {
    try {
        const result= await amiModel.getList();
        res.status(200).json(result);
    } catch(err) {
        console.log("error")
        res.status(500)
    }
}

const getAmiById = async (req, res) => {
    try {
        const result= await amiModel.getAmiById(req.params.id_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log("error")
        res.status(500)
    }
}

module.exports = { getList, getAmiById }