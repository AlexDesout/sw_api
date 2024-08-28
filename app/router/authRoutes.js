const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");

// Liste des routes :
router.post("/api/auth/login", authController.login);


module.exports = router;