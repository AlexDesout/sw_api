const { generateToken } = require('../utils/auth');
const { getUserByUsername } = require('../model/authModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password } = req.body;

    // Rechercher l'utilisateur dans la base de données
    const user = await getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Comparer le mot de passe fourni avec le mot de passe haché stocké
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password 2' });
    }

    // Utiliser la fonction generateToken pour créer un token JWT
    const token = generateToken({ id: user.id, username: user.username });

    res.json({ token });
};

module.exports = {
    login
};
