const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/userModel");
const { config } = require("../config/config");

const signin = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        const user = await userModel.getUserByEmail(email)
        const isMatch = await bcrypt.compare(mot_de_passe, user.password_hash);

        if (!user || !isMatch) {
            return res.status(400).json({ message: 'Login invalide' });
        }
        // sign a jwt token to the frontend for authorization
        const token = jwt.sign(
            { user: { email: user.email, id: user.id_user} },
            config.JWT_SECRET_KEY
        );
        return res.json({ token });
    
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

const signup = async (req, res) => {
    try {
        const { email, mot_de_passe, type } = req.body;
        const isRegistered = await userModel.getUserByEmail(email)

        if (isRegistered) {
            return res.status(400).json({ message: 'Utilisateur déjà existant!'})
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        await userModel.createUser(email, hashedPassword, type);
        res.status(201).json({message: "Utilisateur enregistré"})
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const logout = async (req, res) => {
    try {
        delete req.user;
        res.json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signin, signup, logout }