'use strict';

class Room {

    constructor(roomName) {
        this.players = [];
        this.roomName = roomName;
    }

    addPlayerToRoom(player) {
       this.players.push(player);
    }

    print() {
        console.log(this.players.length);
    }
       
}

module.exports = Room