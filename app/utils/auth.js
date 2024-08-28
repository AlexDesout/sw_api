// utils/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Fonction pour générer un token JWT
function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

// Fonction pour vérifier un token JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
