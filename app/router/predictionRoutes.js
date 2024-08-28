const express = require('express');
const router = express.Router();
const predictionController = require("../controller/predictionController");
const authenticateToken = require('../middleware/authMiddleware');

// Liste des routes :
router.get("/", authenticateToken, predictionController.getPredictions); // All predictions
router.post("/", authenticateToken, predictionController.addPrediction); // Add prediction
router.get("/player/:playerId", authenticateToken, predictionController.getPlayerPredictions); // Display player predictions
router.delete("/:predictionId", authenticateToken, predictionController.deletePrediction); // Delete player prediction
router.post("/:predictionId/win", authenticateToken, predictionController.markPredictionAsWon); // Make prediction win


module.exports = router;