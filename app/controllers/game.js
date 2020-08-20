const Game = require('../models/game')
const Room = require('../models/room')
const RoomManager = require('./room')

var games = []


const createGame = function(room,roundDuration,totalRounds) {
    var game =  new Game(room,roundDuration,totalRounds);
    games.push(game);
    return game;
}

const getGame = function(roomName) {
    for(each of games) {
        if(each.room.roomName == roomName) {
            return each;
        }
    }
    return null;
}

const sendData = function(roomName) {
	var room = RoomManager.getRoom(roomName);
	if(typeof(room)=="undefined") {
		return;
	}
	var game = getGame(roomName)
	var tempPlayerList = [];
	for (i = 0;i<room.players.length;i++) {
		var isDrawing = false;
		if (i == game.currentPlayerDrawingIndex) {
			isDrawing = true;
		}
		var player = {
			username: room.players[i].playerName,
			points: room.players[i].points,
			drawing: isDrawing,
			guessed: room.players[i].guessStatus,
		};
		tempPlayerList.push(player);
    }
	var data = {
		playersList: tempPlayerList,
		roundsPlayed: game.roundsPlayed,
		toatlRounds: game.getTotalRounds(),
		roundDuration: game.getRoundDuration(),
		currentWord: game.getCurrentWord(),
	};
	return JSON.stringify(data);
}

module.exports = { getGame, createGame, sendData}