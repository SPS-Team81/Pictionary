var Room = require('../models/room')
const Player = require('../models/player')

var rooms = [];

const getRoomName = function () {
    return Array(7).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
}

const createRoom = function (noOfRounds, timeToGuess) {
    console.log(noOfRounds + ' ' + timeToGuess);

    let roomName = getRoomName();
    let room = new Room(roomName);
    rooms.push(room);
    console.log(room);
    return room;
}

const addPlayerToRoom = function (roomName, player) {
    var room = rooms.find(room => room.roomName == roomName);
    if(typeof (room) != "undefined") {
        room.addPlayerToRoom(player);
        return 200;
    }
    return 404;
}

module.exports = { createRoom, addPlayerToRoom }