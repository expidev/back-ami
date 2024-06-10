const visitorModel = require("../models/visitorModel");

const insert = async (req, res) => {
    try {
        const {
            nom, 
            adresse,
            id_region,
            type,
            cin_nif,
            email, 
            telephone1,
            telephone2,
            telephone3
        } = req.body;

        let result;
        const isPresent = await visitorModel.getVisitorByEmail(email)
        if (isPresent && isPresent.email == email) {
            await visitorModel.update(
                [   
                    nom, 
                    adresse,
                    parseInt(id_region),
                    type,
                    cin_nif, 
                    email,
                    telephone1,
                    telephone2,
                    telephone3
                ],
                isPresent.id_visiteur, 
                isPresent.count
            );
        } else {
            await visitorModel.insert([
                nom, 
                adresse,
                parseInt(id_region),
                type,
                cin_nif, 
                email,
                telephone1,
                telephone2,
                telephone3
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