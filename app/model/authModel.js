const mysql = require('mysql2');
require('dotenv').config();

// Configuration de la connexion à la base de données
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

const promisePool = pool.promise();

// Fonction pour récupérer un utilisateur par son nom d'utilisateur
const getUserByUsername = async (username) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM auth WHERE username = ?', [username]
        );
        // Retourne le premier utilisateur trouvé ou null si aucun utilisateur n'est trouvé
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Exporter les fonctions du modèle
module.exports = {
    getUserByUsername
};
