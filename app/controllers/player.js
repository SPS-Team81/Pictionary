const Player = require('../models/player')

const createPlayer = function (playerName, isAdmin, socketId) {
    var player = new Player(playerName, isAdmin, socketId);
    // console.log(socketId + " " + player.scoketId);
    return player;
}


module.exports = { createPlayer }