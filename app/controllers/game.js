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
	var game = getGame(roomName)
	let tempPlayerList = [];
	for (i = 0;i<room.players.length;i++) {
		let isDrawing = false;
		if (i == game.currentPlayerDrawingIndex) {
			isDrawing = true;
		}
		let player = {
			username: room.players[i].playerName,
			points: room.players[i].points,
			socketId: room.players[i].socketId,
			drawing: isDrawing,
			guessed: game.guessStatus[i],
		};
		tempPlayerList.push(player);
    }
	let data = {
		playerList: tempPlayerList,
		roundsPlayed: game.roundsPlayed,
		toatlRounds: game.getTotalRounds(),
		roundDuration: game.getRoundDuration(),
		currentWord: game.getCurrentWord(),
    };
	return JSON.stringify(data);
}

module.exports = { getGame, createGame, sendData}