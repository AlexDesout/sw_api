const { findPredictions, sendPrediction, findPredictionsByPlayer, deletePredictionById, getPredictionById, updatePredictionStatus } = require('../model/predictionModel');
const { addPointsToPlayer } = require('../model/playerModel');
const { findCategorie } = require('../model/categoriesModel');

// Display all prediction
const getPredictions = async (req, res) => {

    let predictions = await findPredictions();
    res.status(200).json({ data: predictions });
};

/*
Add a prediction to db :
    user_id: STRING.
    player_id: STRING.
    category_id: INT.
    username: STRING
*/
const addPrediction = async (req, res) => {
    const { user_id, player_id, category_id, username } = req.body;

    if (user_id && player_id && category_id && username) {
        const prediction = await sendPrediction(user_id, player_id, category_id, username);

        if (prediction.error) {
            return res.status(400).json({ error: prediction.error });
        }

        res.status(200).json({ data: prediction });
    } else {
        res.status(400).json({ error: "All fields are required." });
    }
};

const getPlayerPredictions = async (req, res) => {
    const { playerId } = req.params;

    if (!playerId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Récupérer les prédictions de l'utilisateur depuis le modèle
        const predictions = await findPredictionsByPlayer(playerId);

        // Répondre avec les prédictions
        res.status(200).json({ data: predictions });
    } catch (error) {
        console.error('Error fetching user predictions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePrediction = async (req, res) => {
    const { predictionId } = req.params;

    try {
        const result = await deletePredictionById(predictionId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Prediction not found.' });
        }

        res.status(200).json({ message: 'Prediction deleted successfully.' });
    } catch (error) {
        console.error('Error deleting prediction:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const markPredictionAsWon = async (req, res) => {
    const { predictionId } = req.params;

    try {
        // Récupérer la prédiction par son ID
        const prediction = await getPredictionById(predictionId);

        if (!prediction) {
            return res.status(404).json({ error: 'Prediction not found.' });
        }

        // Marquer la prédiction comme gagnante
        const result = await updatePredictionStatus(predictionId, 1);

        if (result.affectedRows === 0) {
            return res.status(500).json({ error: 'Failed to mark prediction as won.' });
        }

        // Récupérer les points de la catégories associées
        const category = await findCategorie(prediction.category_id);

        // Ajouter des points au joueur
        await addPointsToPlayer(prediction.player_id, category.points);

        res.status(200).json({ message: 'Prediction won and points added to player.' });
    } catch (error) {
        console.error('Error marking prediction as won:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    getPredictions,
    addPrediction,
    getPlayerPredictions,
    deletePrediction,
    markPredictionAsWon
};