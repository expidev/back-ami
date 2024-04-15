const logModel = require("../dao/logModel");
const visitorModel = require("../dao/visitorModel");
const supervisorModel = require("../dao/superviseurModel");
const { sendEmailToAdmin } = require("../helper/emailService");

const insertLog = async (req, res, next) => {
    try {
        const {
            id_ami, 
            token
        } = req.params;
        const visitor = await visitorModel.getVisitorByToken(token);
        const hasLoggedBefore = await logModel.getLog(id_ami, visitor.id_visiteur)
        
        if (hasLoggedBefore && hasLoggedBefore.length != 0) {
            await logModel.updateCount(id_ami, visitor.id_visiteur, hasLoggedBefore.count)
        } else {
            await logModel.insertLog(id_ami, visitor.id_visiteur);
            const response = await supervisorModel.getSuperviseurByAmi(id_ami)
            const ccEmail = response.map(visitor => visitor.email)
            await sendEmailToAdmin(process.env.DEFAULT_LOG_EMAIL, ccEmail, {id_ami, ...visitor})
        }

        next();
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { insertLog }