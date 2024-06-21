const superviseurModel = require("../models/superviseurModel");
const { handleSlash } = require("../utility");

const getSuperviseurByAmi = async (req, res) => {
    try {
        let { ref_ami } = req.params;
        ref_ami = handleSlash(ref_ami)
        const result = await superviseurModel.getSuperviseurByAmi(ref_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const addSuperviseur = async (req, res) => {
    try {
        const { ref_ami, nom, email } = req.body;
        const isPresent = await superviseurModel.getSuperviseurByAmi(ref_ami);
        if (isPresent.length && isPresent[0].email == email) {
            res.status(409).json({ success: false, message: "Adresse e-mail déjà existante" });
        } else {
            await superviseurModel.addSuperviseur([nom, email, ref_ami]);
            res.status(200).json({ success: true, message: `Superviseur ajouté.`});
        }

    } catch (error) {
        console.error("Error getting list by ami:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const removeSuperviseur = async (req, res) => {
    try {
        const { id } = req.params;
        await superviseurModel.removeSuperviseur(id);
        res.status(200).json({ success: true, message: `Superviseur supprimé.`});
    } catch (error) {
        console.error("Error getting list by ami:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { 
    getSuperviseurByAmi, 
    removeSuperviseur,
    addSuperviseur
}