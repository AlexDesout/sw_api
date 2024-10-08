const { findRanking } = require('../model/playerModel');

// Display all players
const getRanking = async (req, res) => {

    let players = await findRanking();
    res.status(200).json({ data: players });
};

module.exports = {
    getRanking
};