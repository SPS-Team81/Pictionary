const app = require('express')();
const server = require('http').Server(app);

const { port } = require('./config');

let roomManager = require('./app/controllers/room')
let playerManager = require('./app/controllers/player')


server.listen(port, () => {
    console.log(`Server running at port:${port}`);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/views/index.html');
});

app.post('/createRoom', function (req, res) {
    
    let room = roomManager.createRoom(req.body.noOfRounds, req.body.timeToGuess);
    
    let player = playerManager.createPlayer(req.body.playerName);
    
    roomManager.addPlayerToRoom(room.roomName, player, true);

    var data = {
        playerName: req.body.playerName,
        isAdmin: true,
        roomName: room.roomName,
    };
    res.send(data);
});
