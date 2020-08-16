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
			io.sockets.in(roomName).emit('joinedRoom', playerName + " has joined");
		});

		socket.on('message', function(data){
			let playerData = data.playerData;
			let roomName = data.playerData.roomName;
			let message = data.message;
		    let dataMessage = {
		        player: roomManager.getPlayer(roomName, playerData.playerName),
		        message: message,
		    }			
			io.sockets.in(roomName).emit('message', JSON.stringify(dataMessage));
		});

	});
}

module.exports = {startSocketConnection};
