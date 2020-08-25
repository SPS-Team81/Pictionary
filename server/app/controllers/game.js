const Game = require('../models/game')
const Room = require('../models/room')
const roomManager = require('./room.js')

var games = []


const createGame = function(room,totalRounds,roundDuration) {
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

const getPlayerInfo = function(game,index) {
	var isDrawing = false;
	if(typeof(game)=="undefined") {
		return {};
	}
	if (index == game.getCurrentPlayerDrawingIndex()) {
		isDrawing = true;
	}
	var player = {
		username: game.room.players[index].playerName,
		points: game.room.players[index].points,
		drawing: isDrawing,
		guessed: game.room.players[index].guessStatus,
		gain: game.room.players[index].gain,
		socketId: game.room.players[index].socketId,
	};
	return player;
}

const sendData = function(roomName) {
	var room = roomManager.getRoom(roomName);
	if(typeof(room)=="undefined") {
		return;
	}
	var game = getGame(roomName)
	var tempPlayerList = [];
	for (i = 0;i<room.players.length;i++) {
		tempPlayerList.push(getPlayerInfo(game,i));
    }
	var data = {
		playersList: tempPlayerList,
	};
	return JSON.stringify(data);
}

startNextTurn = function(data,io) {
	var game = getGame(data.roomName);
	game.addGain();
	if(game.gameEnded != true) {
		console.log(data.roomName+" starting new turn");
		game.setNewWord();
		game.resetGuess();
		game.setEndTime();
		var statusData = {
			roundsPlayed: game.roundsPlayed,
			totalRounds: game.getTotalRounds(),
			roundDuration: game.getRoundDuration(),
			currentWord: game.getCurrentWord(),
			playerInfo : {},
		}
		var dt = game.getEndTime();
		io.sockets.in(data.roomName).emit('endTimeData',{endTime: dt.toString()});
		io.sockets.in(data.roomName).emit('playerChangeUpdate',sendData(data.roomName));
		for(var i=0;i<game.room.players.length;i++) {
			playerInfo = getPlayerInfo(game,i),
			io.sockets.in(data.roomName).emit('playerInfo',playerInfo);
			statusData.playerInfo = playerInfo;
			io.sockets.in(data.roomName).emit('statusBarData',statusData);
		}
	} else {
		return;
	}
}

sendNewPlayer = function(data,io) {
	var game = getGame(data.roomName);
	if(game.gameEnded != true) {
		console.log(data.roomName+" starting new turn");
		var statusData = {
			roundsPlayed: game.roundsPlayed,
			totalRounds: game.getTotalRounds(),
			roundDuration: game.getRoundDuration(),
			currentWord: game.getCurrentWord(),
			playerInfo : {},
		}
		var dt = game.getEndTime();
		io.sockets.in(data.roomName).emit('endTimeData',{endTime: dt.toString()});
		io.sockets.in(data.roomName).emit('playerChangeUpdate',sendData(data.roomName));
		for(var i=0;i<game.room.players.length;i++) {
			playerInfo = getPlayerInfo(game,i),
			io.sockets.in(data.roomName).emit('playerInfo',playerInfo);
			statusData.playerInfo = playerInfo;
			io.sockets.in(data.roomName).emit('statusBarData',statusData);
		}
	} else {
		return;
	}
}

module.exports = { getGame, createGame, sendData, deleteGame, startNextTurn, getPlayerInfo, sendNewPlayer}