const path = require('path')
const pool = require('../database/connection')

const amiModel = require("../models/amiModel");
const documentModel = require("../models/documentsModel");
const { removeFiles } = require("../utility");
const { removeSuperviseurByAmi } = require('../models/superviseurModel');

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

const getAmiByRef = async (req, res) => {
    try {
        const result= await amiModel.getAmiByRef(req.params.ref_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

// remove the Ami, but remove all that connects to it, requires a transaction
const removeAmiByRef = async (req, res) => {
    try {
        await pool.query('START TRANSACTION');

        const { ref_ami } = req.params
        const results = await documentModel.getListByAmi(ref_ami)
        await documentModel.removeDocumentsByRefAmi(ref_ami)
        await removeSuperviseurByAmi(ref_ami);//
        await amiModel.removeAmiByRef(ref_ami);

        if (results.length > 0)
        removeFiles(
            results.map(item => 
                path.join(__dirname,'..', 'uploads', 'dao_ami', item.nom_fichier)
            )
        )
        await pool.query('COMMIT')
        res.status(200).json({message: "successful deletion"});
    } 
    catch(err) {
        console.log(err.message)
        await pool.query('ROLLBACK')
        res.status(500)
    }
}

const searchAmiByRef = async (req, res) => {
    try {
        const { ref_ami } = req.params;
        const result= await amiModel.searchAmiByRef(ref_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

module.exports = { getListByPage, getAmiByRef, searchAmiByRef, removeAmiByRef, countPage }