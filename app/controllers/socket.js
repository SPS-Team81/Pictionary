let roomManager = require('./room')

const startSocketConnection = function(server) {
	let io = require('socket.io')(server);
	console.log("socket initiated");
	io.on('connection', (socket) => {
		socket.on('join', function(room) {
			let roomJson = JSON.parse(room);
			let roomName = roomJson.roomName;
			let playerName = roomJson.playerName;
			roomManager.setSocketId(roomName, playerName, socket.id);
			socket.join(roomName);
			console.log(playerName + ' has joined ' + roomName + ' socket id ' + socket.id);
		});

	});
}

module.exports = {startSocketConnection};
