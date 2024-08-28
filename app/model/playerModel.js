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

// Fonction pour récupérer les 10 meilleurs joueurs
const findRanking = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM players ORDER BY total_points DESC LIMIT 10');
        return rows;
    } catch (error) {
        console.error('Error fetching ranking:', error);
        throw error;
    }
};

// Ajouter des points à un joueur
const addPointsToPlayer = async (playerId, points) => {

    console.log(playerId)
    try {
        const [result] = await promisePool.query(
            'UPDATE players SET total_points = total_points + ? WHERE discord_id = ?',
            [points, playerId]
        );

        return result;
    } catch (error) {
        console.error('Error adding points to player:', error);
        throw error;
    }
};

// Exporter les fonctions du modèle
module.exports = {
    findRanking,
    addPointsToPlayer
};
