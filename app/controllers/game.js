const Room = require('../models/room')
const Player = require('../models/player')
const Game = require('../models/game')
const room = require('./room')

var games = []

const getGame = function(roomName) {
    var game = games.find(game => game.room.romoName == romoName);
    return room; 
}

module.exports = {getGame}