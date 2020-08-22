const Game = require('../models/game')
const Room = require('../models/room')
const roomManager = require('./room.js')

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

const findIndex = function(roomName) {
    for(var i = 0;i<games.length;i++) {
        if(games[i].room.roomName==roomName) {
            return i;
        }
    }
    return -1;
}

const deleteGame = function(roomName) {
	var index = findIndex(roomName);
    if(index == -1) {
        return;
    }
    for(var i = index;i<games.length - 1;i++) {
        games[i] = games[i+1];
    }
	games.pop();
}

const sendData = function(roomName) {
	var room = roomManager.getRoom(roomName);
	if(typeof(room)=="undefined") {
		return;
	}
	var game = getGame(roomName)
	var tempPlayerList = [];
	for (i = 0;i<room.players.length;i++) {
		var isDrawing = false;
		if (i == game.getCurrenPlayerDrawingIndex()) {
			isDrawing = true;
		}
		var player = {
			username: room.players[i].playerName,
			points: room.players[i].points,
			drawing: isDrawing,
			guessed: room.players[i].guessStatus,
			gain: room.players[i].gain,
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

module.exports = { getGame, createGame, sendData, deleteGame}