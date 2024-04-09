const visitorModel = require("../dao/visitorModel");

const insert = async (req, res) => {
    try {
        const {
            nom, 
            prenom, 
            cin_nif, 
            email_entreprise, 
            telephone
        } = req.body;
        let result;
        const isPresent = await visitorModel.getVisitorByEmail(email_entreprise)
        if (isPresent && isPresent.email_entreprise == email_entreprise) {
            await visitorModel.updateCount(isPresent.id_visiteur, isPresent.count);
        } else {
            await visitorModel.insert([
                nom, 
                prenom, 
                cin_nif, 
                email_entreprise,
                telephone
            ]);
        }

        res.status(201).json(result);
    } catch(err) {
        console.log(err.message)
        res.status(500)
    }
}

const getVisitorById = async (req, res) => {
    try {
        const id_visiteur = req.params.id_visiteur;

        const result = await visitorModel.getVisitorById(id_visiteur);

        res.status(200);
        res.json(result);
    } catch(err) {
        console.log(error.message)
        res.status(404);
    }
}

module.exports = { insert, getVisitorById }