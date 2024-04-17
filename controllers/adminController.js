const jwt = require("jsonwebtoken")
const adminModel = require("../dao/adminModel");
require("dotenv").config();

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await adminModel.getAdminByEmail(email)
        if (!user || user.mot_de_passe != password) {
            return res.status(400).json({ message: 'Login invalide' });
        }
        const token = jwt.sign(
            { user: { email: user.email, id: user.id} },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );
        return res.json({ token });
    
    } catch(err) {
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

module.exports = { signin, logout }