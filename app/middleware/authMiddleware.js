// middleware/authMiddleware.js

const { verifyToken } = require('../utils/auth');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    // console.log(token)
    if (authHeader == null) return res.sendStatus(401); // Unauthorized

    try {
        const user = verifyToken(authHeader);
        req.user = user; // Ajouter l'utilisateur au req pour les routes suivantes
        next();
    } catch (error) {
        res.sendStatus(403); // Forbidden
    }
}

module.exports = authenticateToken;
