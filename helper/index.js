const fs = require('fs');
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

const downloadFile = async (res, type_fichier, fileName) => {
  const filePath = path.join(__dirname, '..', 'uploads', 'dao_ami', fileName);
  
  try {
    // Check if the file exists asynchronously
    await fs.promises.access(filePath, fs.constants.F_OK);

    const contentType = type_fichier;

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', contentType);

    // Create read stream from file and pipe it to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error('File does not exist:', err);
    res.status(404).send('File not found');
  }
};


module.exports = { removeFile, downloadFile };
