const amiModel = require("../dao/amiModel");

const getListByPage = async (req, res) => {
    try {
        const { page } = req.params
        const result= await amiModel.getListByPage(page);
        res.status(200).json(result);
    } catch(err) {
        console.log("error")
        res.status(500)
    }
}

const countPage = async (req, res) => {
    try {
        const result= await amiModel.countPage();
        res.status(200).json({ count: result[0].count});
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

const searchAmiById = async (req, res) => {
    try {
        const result= await amiModel.searchAmiById(req.params.id_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log("error")
        res.status(500)
    }
}

module.exports = { getListByPage, getAmiById, searchAmiById, countPage }