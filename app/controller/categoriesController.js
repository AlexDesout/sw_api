const { findCategories } = require('../model/categoriesModel');

// Display all players
const getCategories = async (req, res) => {

    let categories = await findCategories();
    res.status(200).json({ data: categories });
};

module.exports = {
    getCategories
};