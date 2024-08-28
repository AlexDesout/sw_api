const express = require("express");
const playerRoutes = require('./app/router/playerRoutes');
const authRoutes = require('./app/router/authRoutes');
const categoriesRoutes = require('./app/router/categoriesRoutes');
const predictionRoutes = require('./app/router/predictionRoutes');

require('dotenv').config();

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ajout de la route qui retourne "Bonjour"
app.get('/', (req, res) => {
    res.send(process.env.DB_NAME);
});

// Utilisation des routes de login
app.use(authRoutes);

// Utilisation des routes player
app.use(playerRoutes);

// Utilisation des routes catégories
app.use(categoriesRoutes);

// Utilisation des routes prédictions
app.use(predictionRoutes);


app.listen(process.env.PORT, () => {
    console.log("Server Started");
});


// const bcrypt = require('bcrypt');


// Générer un mdp
// async function generateHash(password) {
//     try {
//         const saltRounds = 10; // Choisissez le nombre de rounds
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const passwordMatch = await bcrypt.compare(password, "$2b$10$5qIm1viufqV2zNCSnbbj/.nwkfg1wpbNJauHW9qXa.hXFNnWIMLq.");
//         console.log('Hashed Password:', hashedPassword);
//         console.log('passwordMatch',  passwordMatch)
//         return hashedPassword;
//     } catch (error) {
//         console.error('Error hashing password:', error);
//     }
// }

// generateHash('test');