let roomManager = require('./room')
let gameManager = require('./game')
let playerManager = require('./player');
const Player = require('../models/player');
const player = require('./player');

const startSocketConnection = function(server) {
	let io = require('socket.io')(server);
	console.log("socket initiated");
	
	io.on('connection', (socket) => {
	
		socket.on('join', function(room) {
			var roomJson = JSON.parse(room);
			var status;
			var newRoomName = "";
			var playerName = roomJson.playerName;
			if(roomJson.isAdmin===true) {
				console.log("Creating a room.");
				
				var room = roomManager.createRoom();
				
				console.log("Created a new room named "+room.roomName);
				
				const player = playerManager.createPlayer(roomJson.playerName,true,socket.id);
				
				roomManager.addPlayerToRoom(room.roomName,player);
				
				var game = gameManager.createGame(room,parseInt(roomJson.totalRounds),parseInt(roomJson.timeToGuess));
				
				status = 200;
				newRoomName = room.roomName
			} else {
				console.log("New PLayer joining room "+roomJson.roomName);
				
				var player = playerManager.createPlayer(roomJson.playerName,false,socket.id);
				
				status = roomManager.addPlayerToRoom(roomJson.roomName, player);
				if(status==200) {
					newRoomName = roomJson.roomName;
				}
			}
			data = {
				roomName: newRoomName,
				playerName: playerName,
				status: status,
			};
			socket.emit('newJoinee',JSON.stringify(data));
			if(status==200) {
				socket.join(newRoomName);
				io.sockets.in(newRoomName).emit('joinedRoom', playerName + " has joined");
				io.sockets.in(newRoomName).emit('playerChangeUpdate',gameManager.sendData(newRoomName));
			}
		});

		socket.on('disconnecting',() => {
			const rooms = socket.rooms;
			for(roomName in rooms) {
				const room = roomManager.getRoom(roomName);
				if(typeof(room)!="undefined") {
					console.log("player leaving room "+roomName);
					if(room.players.length==1) {
						gameManager.deleteGame(room.roomName);
					}
					roomManager.deletePlayer(room,socket.id);
					io.sockets.in(roomName).emit('playerChangeUpdate',gameManager.sendData(roomName));
				}	
			}
		}); 

		socket.on('drawEvent',(data) => {
			// dataJson = JSON.parse(data);
			socket.to(data.roomName).emit('drawReceive',data);
		});

		socket.on('sendMessage',(data) => {
			var player = roomManager.getPlayer(data.roomName,socket.id);
			out = {
				data = [player.playerName,data.message,socket.id],	
			}
			socket.to(data.roomName).emit('revieveMessage',data);
		});

	});
	
}

module.exports = {startSocketConnection};
