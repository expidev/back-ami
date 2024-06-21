const multer = require('multer');
const documentsModel = require("../models/documentsModel");
const amiModel = require("../models/amiModel")
const pool = require("../database/connection")
const { v4: uuidv4 } = require('uuid');
const { removeFile, downloadFile, downloadZipDocuments, handleSlash } = require('../utility');
const path = require('path');

// change the destination and the filename of the file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dao_ami');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

// Validate file type
const fileFilter = function (req, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
    }
};

// Configure multer to handle multiple file uploads
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 3 * 1024 * 1024 } // 3MB file size limit
}).any("");

const uploadAndInsert = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "File upload error" });
        } else if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const files = req.files;
        const { ref_ami, description, action } = req.body;
        const ref_unique = uuidv4();
        
        try {
            await pool.query("START TRANSACTION");
            const response = await amiModel.getAmiByRef(ref_ami);
            if (action === "update") {
                await amiModel.updateDescription(description, ref_ami);
            } else {
                if (response.length !== 0) {
                    return res.status(409).json({ message: 'Duplicate Ref. AMI' });
                }
                await amiModel.addAmi([ref_ami, req.user.id, description, ref_unique, new Date()]);
            }
            
            if (files && files.length > 0) {
                for (const file of files) {
                    await documentsModel.insert([
                        req.user.id,
                        ref_ami,
                        file.filename,
                        file.mimetype,
                        file.size,
                        new Date()
                    ]);
                }
            }

            await pool.query("COMMIT");
            res.status(201).json({ message: "Files uploaded and inserted successfully" });
        } catch (error) {
            console.error("Error uploading and inserting:", error);
            await pool.query("ROLLBACK");
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};


const getListByAmi = async (req, res) => {
    try {
        let { ref_ami } = req.params;
        ref_ami = handleSlash(ref_ami)
        const result = await documentsModel.getListByAmi(ref_ami);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting list by ami:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeDocument = async (req, res) => {
    try {
        const { id_fichier, nom_fichier } = req.params;
        const filePath = path.join(__dirname,'..', 'uploads', 'dao_ami', nom_fichier);
        removeFile(filePath);
        await documentsModel.removeDocument(id_fichier);
        res.status(200).json({ success: true, message: `Document supprimé.`});
    } catch (error) {
        console.error("Error getting list by ami:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const downloadDocument = async (req, res) => {
    try {
        const { type_fichier, nom_fichier } = req.body;
        await downloadFile(res, type_fichier, nom_fichier);
    } catch (error) {
        console.error("Error downloading the file:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const downloadZip = async (req, res) => {
    try {
        let { ref_ami } = req.params;
        ref_ami = handleSlash(ref_ami)
        const fileDataArray = await documentsModel.getListByAmi(ref_ami)
        await downloadZipDocuments(res, fileDataArray);
    } catch (error) {
        console.error("Error downloading the file:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { 
    uploadAndInsert, 
    getListByAmi, 
    removeDocument, 
    downloadDocument,
    downloadZip
};
