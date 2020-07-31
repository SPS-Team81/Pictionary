'use strict';

class Room {

    constructor(roomName,turnDuration, totalRounds) {
        this.IDLE = 0;
        this.ROUND_IN_PROGRESS = 1;
        this.WAITING_FOR_NEXT_ROUND = 2;
        this.ANNOUNCEMENT_OF_WINNER = 3;
        this.NOT_ENOUGH_PLAYER_TO_CONITNUE = 4;
        
        this.roomName = roomName;
        this.players = [];
        this.AdminIndex = 0;
        this.turnDuration = turnDuration;
        this.totalRounds = totalRounds;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
        this.currentWord = null;
        this.usedWordsIndex = [];
        this.gameState = this.IDLE;
    }

    addPlayerToRoom(player,isAdmin) {
       this.players.push(player);
       if(isAdmin) {
           this.AdminIndex = this.players.length - 1;
       }
    }

    print() {
        console.log(this.players.length);
    }
       
}

module.exports = Room