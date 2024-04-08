const logModel = require("../dao/logModel");
const visitorModel = require("../dao/visitorModel");

const insertLog = async (req, res, next) => {
    try {
        const {
            id_ami, 
            token
        } = req.params;
        const visitor = await visitorModel.getVisitorByToken(token);
        const response = await logModel.insertLog(id_ami, visitor.id_visiteur);
        next();
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { insertLog }