const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const documentsModel = require("../dao/documentsModel");

// Use a dynamic insertId for each request
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dao_ami');
    },
    filename: (req, file, cb) => {
        const insertId = uuidv4(); // Generate a new insertId for each file
        cb(null, insertId + '_' + Date.now() + '_' + file.originalname);
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
            const { id_ami } = req.body;

            console.log("Uploaded files:", files);
            
            for (const file of files) {
                await documentsModel.insert([
                    1,
                    id_ami,
                    file.filename,
                    file.mimetype,
                    file.size,
                    new Date()
                ]);
            }

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

module.exports = { uploadAndInsert, getListByAmi };
