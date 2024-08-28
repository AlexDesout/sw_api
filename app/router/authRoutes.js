const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");

// Liste des routes :
router.post("/login", authController.login);


module.exports = router;