const path = require('path')

const amiModel = require("../dao/amiModel");
const documentModel = require("../dao/documentsModel");
const { removeFiles } = require("../helper");

const getListByPage = async (req, res) => {
    try {
        const { page } = req.params
        const result= await amiModel.getListByPage(page);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const countPage = async (req, res) => {
    try {
        const result= await amiModel.countPage();
        res.status(200).json({ count: result[0].count});
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const getAmiById = async (req, res) => {
    try {
        const result= await amiModel.getAmiById(req.params.id_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const removeAmiById = async (req, res) => {
    try {
        const id_ami = req.params.id_ami
        const results = await documentModel.getListByAmi(id_ami)
        if (results.length > 0)
            removeFiles(
                results.map(item => 
                    path.join(__dirname,'..', 'uploads', 'dao_ami', item.nom_fichier)
                )
            )
        await documentModel.removeDocumentsByAmi(id_ami)
        await amiModel.removeAmiById(id_ami);
        res.status(200).json({message: "successful deletion"});
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const searchAmiById = async (req, res) => {
    try {
        const result= await amiModel.searchAmiById(req.params.id_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

module.exports = { getListByPage, getAmiById, searchAmiById, removeAmiById, countPage }