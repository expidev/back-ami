const telechargementModel = require("../models/telechargementModel");
const visitorModel = require("../models/visitorModel");
const supervisorModel = require("../models/superviseurModel");
const { sendEmailToAdmin } = require("../utility/emailService");
const { handleSlash } = require("../utility");

const insertTelechargement = async (req, res, next) => {
    try {
        let {
            ref_ami, 
            token
        } = req.params;
        ref_ami = handleSlash(ref_ami);
        const visitor = await visitorModel.getVisitorByToken(token);
        if (visitor) {
            const hasLoggedBefore = await telechargementModel.getTelechargement(ref_ami, visitor.id_visiteur)
        
        
            if (hasLoggedBefore && hasLoggedBefore.length != 0) {
                await telechargementModel.updateCount(ref_ami, visitor.id_visiteur, hasLoggedBefore.count)
            } else {
                await telechargementModel.insertTelechargement(ref_ami, visitor.id_visiteur);
                const response = await supervisorModel.getSuperviseurByAmi(ref_ami)
                const ccEmail = response.map(visitor => visitor.email)
                
                await sendEmailToAdmin(process.env.DEFAULT_LOG_EMAIL, ccEmail, {ref_ami, ...visitor})
            }
        } else {
            throw Error("Visitor doesn't exist")
        }

        next();
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { insertTelechargement }