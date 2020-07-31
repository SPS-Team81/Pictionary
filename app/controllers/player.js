const Player = require('../models/player')

const createPlayer = function (playerName) {
    let player = new Player(playerName);
    return player;
}

module.exports = { createPlayer }