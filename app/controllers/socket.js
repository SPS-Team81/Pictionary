let roomManager = require('./room')
let gameManager = require('./game')
let playerManager = require('./player')

const startSocketConnection = function(server) {
	let io = require('socket.io')(server);
	console.log("socket initiated");
	
	io.on('connection', (socket) => {
	
		socket.on('join', function(room) {
			let roomJson = JSON.parse(room);
			console.log(roomJson);
			let roomName = roomJson.roomName;
			let playerName = roomJson.playerName;

			if(!roomJson.isAdmin) {
				var player = playerManager.createPlayer(playerName, false);
				roomManager.addPlayerToRoom(roomName, player);
			}
			
			roomManager.setSocketId(roomName, playerName, socket.id);
			socket.join(roomName);
			io.sockets.in(roomName).emit('joinedRoom', playerName + " has joined");
			io.sockets.in(roomName).emit('playerChangeUpdate',gameManager.sendData(roomName));
		});

		socket.on('dataQuery', function(roomName) {
			console.log('Qwery for room:'+roomName);
			socket.emit('sendData',gameManager.sendData(roomName))
		});

	});
	
}

module.exports = {startSocketConnection};
