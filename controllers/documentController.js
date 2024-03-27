const multer = require('multer');
const documentsModel = require("../dao/documentsModel");
const amiModel = require("../dao/amiModel")
const { removeFile, downloadFile } = require('../helper');
const path = require('path');

// Use a dynamic insertId for each request
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dao_ami');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// Configure multer to handle multiple file uploads
const upload = multer({ storage: storage }).any();

const uploadAndInsert = async (req, res) => {
    try {
        // Call the upload middleware to handle file upload
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({ message: "File upload error" });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({ message: "Internal Server Error" });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const files = req.files;
            const { id_ami, description } = req.body;
            for (const file of files) {
                await documentsModel.insert([
                    req.user.id,
                    id_ami,
                    file.filename,
                    file.mimetype,
                    file.size,
                    new Date()
                ]);
            }
            await amiModel.updateDescription(description, id_ami);
            res.status(201).json({ message: "Files uploaded and inserted successfully" });
        });
    } catch (error) {
        console.error("Error uploading and inserting:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getListByAmi = async (req, res) => {
    try {
        const id_ami = req.params.id_ami;
        const result = await documentsModel.getListByAmi(id_ami);
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
        console.log(filePath);
        removeFile(filePath);
        const result = await documentsModel.removeDocument(id_fichier);
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

module.exports = { uploadAndInsert, getListByAmi, removeDocument, downloadDocument };
