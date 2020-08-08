'use strict';

class Room {
    players = [];
    
    constructor(roomName) {
        this.roomName = roomName;
    }

    addPlayerToRoom = function (player) {
       this.players.push(player);
    }

    print() {
        console.log(this.players.length);
    }
       
}

module.exports = Room