var Room = require('../models/room')
const Player = require('../models/player')

var rooms = [];

const getRoomName = function () {
    return Array(7).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
}

const getRoom = function (roomName) {
    var room = rooms.find(room => room.roomName == roomName);
    return room;
}

const getPlayer = function (roomName, playerName) {
	var room = getRoom(roomName);
    if (typeof(room) != "undefined") {
        var player = room.players.find(player => player.playerName == playerName);
        return player;
    }
    return undefined;
}

const createRoom = function () {
    let roomName = getRoomName();
    let room = new Room(roomName);
    rooms.push(room);
    return room;
}

const addPlayerToRoom = function (roomName, player) {
	var room = getRoom(roomName);
    if(typeof (room) != "undefined") {
        room.addPlayerToRoom(player);
        return 200;
    }
    return 404;
}

const setSocketId = function (roomName, playerName, socketId) {
    let player = getPlayer(roomName, playerName);
    if (typeof (player) != "undefined") {
        player.sockerId = socketId;
    }
}

module.exports = {createRoom, getRoom, getPlayer, addPlayerToRoom, setSocketId}