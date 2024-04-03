const jwt = require("jsonwebtoken")
const adminModel = require("../dao/adminModel");
require("dotenv").config();

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await adminModel.getAdminByEmail(email)
        if (!user) {
            return res.status(400).json({ message: 'Email non trouvé' });
        }
        const passwordMatch = user.mot_de_passe === password;
        if (passwordMatch) {
            const token = jwt.sign({ user: { email: user.email, id: user.id} }, process.env.JWT_SECRET_KEY);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Mot de passe invalide' });
        }
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}


module.exports = { signin }