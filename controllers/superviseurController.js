const superviseurModel = require("../dao/superviseurModel");

const getSuperviseurByAmi = async (req, res) => {
    try {
        const { id_ami } = req.params;
        const result = await superviseurModel.getSuperviseurByAmi(id_ami);
        res.status(200).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const addSuperviseur = async (req, res) => {
    try {
        const { id_ami, nom, email } = req.body;
        const isPresent = await superviseurModel.getSuperviseurByAmi(id_ami);
        if (isPresent.length && isPresent[0].email == email) {
            res.status(400).json({ success: false, message: "Adresse e-mail déjà existée" });
        } else {
            const result = await superviseurModel.addSuperviseur([nom, email, id_ami]);
            res.status(200).json({ success: true, message: `Superviseur ajouté.`});
        }

    } catch (error) {
        console.error("Error getting list by ami:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const removeSuperviseur = async (req, res) => {
    try {
        const { id_superviseur } = req.params;
        const result = await superviseurModel.removeSuperviseur(id_superviseur);
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