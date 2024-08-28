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

// Récupérer toutes les catégories
const findCategories = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM categories');
        return rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Récupérer une les catégorie
const findCategorie = async (id) => {
    try {
        const [result] = await promisePool.query('SELECT * FROM categories WHERE ID = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Exporter les fonctions du modèle
module.exports = {
    findCategories,
    findCategorie
};
