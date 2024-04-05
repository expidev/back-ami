const JSZip = require('jszip');
const fs = require('fs');
const { Readable } = require('stream');
const path = require('path');

// Helper function to remove a file
const removeFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} removed successfully`);
    } else {
      console.log(`File ${filePath} does not exist`);
    }
  } catch (error) {
    console.error(`Error removing file ${filePath}:`, error);
    throw error;
  }
};

const downloadFile = async (res, type_fichier, nom_fichier) => {
  const filePath = path.join(__dirname, '..', 'uploads', 'dao_ami', nom_fichier);
  
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);

    const contentType = type_fichier;

    res.setHeader('Content-Disposition', `attachment; nom_fichier=${nom_fichier}`);
    res.setHeader('Content-Type', contentType);

    // Create read stream from file and pipe it to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error('File does not exist:', err);
    res.status(404).send('File not found');
  }
};

const downloadZipDocuments = async (res, fileDataArray) => {
  const zip = new JSZip();

  try {
    for (const { nom_fichier, type_fichier } of fileDataArray) {
      const filePath = path.join(__dirname, '..', 'uploads', 'dao_ami', nom_fichier);
      await fs.promises.access(filePath, fs.constants.F_OK);
      const fileData = await fs.promises.readFile(filePath);
      zip.file(nom_fichier, fileData, { contentType: type_fichier });
    }

    // Generate the zip file in memory
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Set headers for the response
    res.setHeader('Content-Disposition', 'attachment; filename=documents.zip');
    res.setHeader('Content-Type', 'application/zip');

    // Create a readable stream from the zip data and pipe it to the response
    const zipStream = new Readable();
    zipStream.push(zipData);
    zipStream.push(null); // End of stream
    zipStream.pipe(res);
  } catch (error) {
    console.error('Error generating or sending zip file:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { removeFile, downloadFile, downloadZipDocuments };
