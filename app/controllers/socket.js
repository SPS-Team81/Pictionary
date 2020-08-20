let roomManager = require('./room')
let gameManager = require('./game')
let playerManager = require('./player')

const startSocketConnection = function(server) {
	let io = require('socket.io')(server);
	console.log("socket initiated");
	
	io.on('connection', (socket) => {
	
		socket.on('join', function(room) {
			var roomJson = JSON.parse(room);
			// console.log(room);
			console.log(roomJson);
			var status;
			var newRoomName = "";
			var playerName = roomJson.playerName;
			if(roomJson.isAdmin==="true") {
				console.log("Creating a room.");
				var room = roomManager.createRoom();
				console.log("Created a new room named: "+room.roomName);
				var player = playerManager.createPlayer(roomJson.playerName,true);
				roomManager.addPlayerToRoom(room.roomName,player);
				var game = gameManager.createGame(room,parseInt(roomJson.totalRounds),parseInt(roomJson.timeToGuess));
				status = 200;
				newRoomName = room.roomName
			} else {
				var player = playerManager.createPlayer(roomJson.playerName,true);
				status = roomManager.addPlayerToRoom(roomJson.roomName, player);
				if(status==200) {
					roomManager.setSocketId(roomJson.roomName, roomJson.playerName, socket.id);
					newRoomName = room.roomName;
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

	});
	
}

module.exports = {startSocketConnection};
