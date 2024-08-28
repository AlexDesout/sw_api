const express = require('express');
const router = express.Router();
const predictionController = require("../controller/predictionController");
const authenticateToken = require('../middleware/authMiddleware');

// Liste des routes :
router.get("/api/predictions", authenticateToken, predictionController.getPredictions); // All predictions
router.post("/api/predictions", authenticateToken, predictionController.addPrediction); // Add prediction
router.get("/api/predictions/player/:playerId", authenticateToken, predictionController.getPlayerPredictions); // Display player predictions
router.delete("/api/predictions/:predictionId", authenticateToken, predictionController.deletePrediction); // Delete player prediction
router.post("/api/predictions/:predictionId/win", authenticateToken, predictionController.markPredictionAsWon); // Make prediction win


module.exports = router;