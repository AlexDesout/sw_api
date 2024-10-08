const express = require('express');
const router = express.Router();
const categoriesController = require("../controller/categoriesController");
const authenticateToken = require('../middleware/authMiddleware');

// Liste des routes :
router.get("/api/categories", authenticateToken, categoriesController.getCategories); // All categories


module.exports = router;