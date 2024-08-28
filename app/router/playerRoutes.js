const express = require('express');
const router = express.Router();
const playerController = require("../controller/playerController");
const authenticateToken = require('../middleware/authMiddleware');

// Liste des routes :
router.get("/ranking", authenticateToken, playerController.getRanking); // Top 10 best players


module.exports = router;