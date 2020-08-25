let roomManager = require('./room')
let gameManager = require('./game')
let playerManager = require('./player');
const Player = require('../models/player');
const player = require('./player');
const game = require('./game');
const { response } = require('express');

const startSocketConnection = function (server) {
	let io = require('socket.io')(server);
	console.log("socket initiated");
	
	io.on('connection', (socket) => {

		socket.on('join', function (room) {
			var roomJson = JSON.parse(room);
			var status;
			var newRoomName = "";
			var playerName = roomJson.playerName;
			var length = 0;
			if (roomJson.isAdmin === true) {
				console.log("Creating a room.");

				var room = roomManager.createRoom();

				console.log("Created a new room named " + room.roomName);

				const player = playerManager.createPlayer(roomJson.playerName, true, socket.id);

				roomManager.addPlayerToRoom(room.roomName, player);

				var game = gameManager.createGame(room, parseInt(roomJson.totalRounds), parseInt(roomJson.timeToGuess));

				length = room.players.length;
				status = 200;
				newRoomName = room.roomName
			} else {
				console.log("New PLayer joining room " + roomJson.roomName);

				var player = playerManager.createPlayer(roomJson.playerName, false, socket.id);

				status = roomManager.addPlayerToRoom(roomJson.roomName, player);
				if (status == 200) {
					newRoomName = roomJson.roomName;
					var game = gameManager.getGame(newRoomName);
					length = game.room.players.length;
					// if(game.room.players.length == 2) {
					// 	gameManager.startNextTurn({roomName: newRoomName},io);
					// }
				}
			}
			data = {
				roomName: newRoomName,
				playerName: playerName,
				status: status,
			};
			socket.emit('newJoinee', JSON.stringify(data));
			if (status == 200) {
				socket.join(newRoomName);
				io.sockets.in(newRoomName).emit('playerCountUpdate', { count: length });
				io.sockets.in(newRoomName).emit('joinedRoom', playerName + " has joined");
				if (length == 2) {
					gameManager.startNextTurn({ roomName: newRoomName }, io);
				} else if (length > 2) {
					gameManager.sendNewPlayer({ roomName: newRoomName }, io);
				}
				io.sockets.in(newRoomName).emit('playerChangeUpdate', gameManager.sendData(newRoomName));
			}
		});

		socket.on('disconnecting', () => {
			const rooms = socket.rooms;
			for (roomName in rooms) {
				const room = roomManager.getRoom(roomName);
				if (typeof (room) != "undefined") {
					console.log("player leaving room " + room.roomName + " room size: " + room.players.length);
					if (room.players.length == 1) {
						gameManager.deleteGame(room.roomName);
						roomManager.deletePlayer(room, socket.id);
						return;
					}
					var game = gameManager.getGame(roomName);
					if (roomManager.getPlayerIndex(roomName, socket.id) == game.getCurrentPlayerDrawingIndex()) {
						game.nextTurn();
						gameManager.startNextTurn({ roomName: roomName }, io);
					}
					roomManager.deletePlayer(room, socket.id);
					io.sockets.in(roomName).emit('playerCountUpdate', { count: room.players.length });
					io.sockets.in(roomName).emit('playerChangeUpdate', gameManager.sendData(roomName));
				}
			}
		});

		socket.on('drawEvent', (data) => {
			// dataJson = JSON.parse(data);
			socket.to(data.roomName).emit('drawReceive', data);
		});

		socket.on('sendMessage', (data) => {
			var player = roomManager.getPlayer(data.roomName, socket.id);
			var game = gameManager.getGame(data.roomName);
			if (game.checkWord(data.message)) {
				if (player.guessStatus || roomManager.getPlayerIndex(data.roomName, socket.id) == game.getCurrentPlayerDrawingIndex()) {
					return;
				}
				player.gain += game.calculatePlayerScore();
				player.guessStatus = true;

				game.room.players[game.getCurrentPlayerDrawingIndex()].gain += game.calculateDrawerScore();
				out = {
					data: ["System", player.playerName + " guessed correctly!!", "SYSTEM_SOCKET_ID"],
				}

				if (game.allGuessed()) {
					game.nextTurn();
					gameManager.startNextTurn({roomName: game.room.roomName}, io);
				}
				io.sockets.in(data.roomName).emit('playerChangeUpdate', gameManager.sendData(data.roomName));
			} else {
				out = {
					data: [player.playerName, data.message, socket.id],
				}
			}

			io.sockets.in(data.roomName).emit('revieveMessage', out);
		});

		socket.on('nextTurn', (data) => {
			var game = gameManager.getGame(data.roomName);
			game.nextTurn();
			gameManager.startNextTurn(data, io);
		});

		socket.on('clearCanvas', (data) => {
			console.log("CLear");
			socket.to(data.roomName).emit('clearReceive');
		});

		// socket.on('startGame',(data) => {
		// 	gameManager.startNextTurn(data,io);
		// });
	});

}

module.exports = { startSocketConnection };
