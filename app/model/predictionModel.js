const mysql = require('mysql2');
require('dotenv').config();

// Configuration de la connexion à la base de données
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

const promisePool = pool.promise();

// Récupérer toutes les prédictions
const findPredictions = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM predictions WHERE is_WON = FALSE');
        return rows;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        throw error;
    }
};

// Créer une nouvelle prédiction
const sendPrediction = async (user_id, player_id, category_id, username) => {
    try {
        // Vérifier si l'utilisateur a déjà fait une prédiction pour cette catégorie
        const [existingPrediction] = await promisePool.query(
            'SELECT * FROM predictions WHERE is_won = FALSE AND player_id = ? AND category_id = ?',
            [player_id, category_id]
        );
        
        if (existingPrediction.length > 0) {
            // Si une prédiction existe déjà, renvoyer un message d'erreur
            return {
                error: "You have already made a prediction for this category."
            };
        }
        
        // Vérifier si le joueur existe dans la table players
        const [existingPlayer] = await promisePool.query('SELECT * FROM players WHERE discord_id = ?', [player_id]);
        
        // Si le joueur n'existe pas, l'ajouter dans la table players avec le username
        if (existingPlayer.length === 0) {
            const insertUserQuery = 'INSERT INTO players (discord_id, username) VALUES (?, ?)';
            await promisePool.query(insertUserQuery, [player_id, username]);
            console.log(`User with discord_id ${player_id} and username ${username} added to players table.`);
        }
        
        // Créer la prédiction
        const insertPredictionQuery = `
        INSERT INTO predictions (user_id, player_id, category_id, created_at)
        VALUES (?, ?, ?, NOW())
        `;
        await promisePool.query(insertPredictionQuery, [user_id, player_id, category_id]);
        
        console.log(`Prediction created for user_id: ${user_id}, player_id: ${player_id}, category_id: ${category_id}`);
        
        return {
            user_id,
            player_id,
            category_id,
            message: "Prediction successfully created."
        };
    } catch (error) {
        console.error('Error in sendPrediction:', error);
        throw error;
    }
};

// Fonction pour récupérer les prédictions d'un utilisateur spécifique
const findPredictionsByPlayer = async (playerId) => {
    try {
        // Requête SQL pour récupérer les prédictions de l'utilisateur
        const [rows] = await promisePool.query('SELECT * FROM predictions WHERE is_won = FALSE AND player_id = ?', [playerId]);
        return rows;
    } catch (error) {
        console.error('Error fetching user predictions:', error);
        throw error;
    }
};

// Supprimer une prédiction
const deletePredictionById = async (id) => {
    try {
        const [result] = await promisePool.query('DELETE FROM predictions WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Error deleting prediction:', error);
        throw error;
    }
};

// Récupérer une prédiction par ID
const getPredictionById = async (predictionId) => {
    try {
        const [result] = await promisePool.query('SELECT * FROM predictions WHERE id = ?', [predictionId]);
        return result[0];
    } catch (error) {
        console.error('Error finding prediction:', error);
        throw error;
    }
};

// Mettre à jour le statut d'une prédiction
const updatePredictionStatus = async (predictionId, status) => {
    try {
        const [result] = await promisePool.query(
            'UPDATE predictions SET is_won = ? WHERE id = ?',
            [status, predictionId]
        );

        return result;
    } catch (error) {
        console.error('Error updating prediction status:', error);
        throw error;
    }
};


// Exporter les fonctions du modèle
module.exports = {
    findPredictions,
    sendPrediction,
    findPredictionsByPlayer,
    deletePredictionById,
    getPredictionById,
    updatePredictionStatus
};
