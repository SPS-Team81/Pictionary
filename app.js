const app = require('express')();
const server = require('http').Server(app);
const path = require('path');
const {port} = require('./config');

let roomManager = require('./app/controllers/room')
let playerManager = require('./app/controllers/player')
let socket = require('./app/controllers/socket')

var url = require('url');
var bodyParser = require('body-parser');

app.use(require('express').static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`Server running at port:${port}`);
    socket.startSocketConnection(server);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/views/index.html');
});

app.post('/createRoom', function (req, res) {
    let room = roomManager.createRoom(req.body.noOfRounds, req.body.timeToGuess);
    let player = playerManager.createPlayer(req.body.playerName, true);
    roomManager.addPlayerToRoom(room.roomName, player);

    var data = {
        playerName: req.body.playerName,
        isAdmin: true,
        roomName: room.roomName,
    };
    res.send(data);
});

app.post('/joinRoom', function (req, res) {
    let player = playerManager.createPlayer(req.body.playerName, false);
    let status = roomManager.addPlayerToRoom(req.body.roomName, player);
    
    let data = {
    	status: status,
    };

    res.status(status);
    res.send(JSON.stringify(data));
});

