var fs = require("fs");

class Game {
    constructor(room,roundDuration,totalRounds,players) {
        this.roundDuration = roundDuration;
        this.totalRounds = totalRounds;
        this.room = room;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
        this.unusedWords = [];
        this.currentWord = none;

        this.getWords();
    }

    getWords = function() {
        fs.readFile("../../words.txt", function(text){
            this.unusedWords = text.split("\n")
        });
    }

    resetGame = function() {
        for (const player of this.room.players) {
            player.points = 0;
        }
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
    }

    getCurrentPlayerDrawing = function() {
        return this.game.players[this.currentPlayerDrawingIndex];
    }

    getCurrentWord = function() {
        return this.currentWord;
    }

    getRoundDuration = function(){
        return this.roundDuration;
    }

    getTotalRounds = function() {
        return this.totalRounds;
    }

    setNewWord = function() {
        this.currentWord = this.unusedWords[Math.floor((Math.random() * this.unusedWords.length))];
        this.unusedWords.remove(this.currentWord);
    }

    nextTurn = function() {
        this.currentPlayerDrawingIndex += 1;
        if(this.currentPlayerDrawingIndex == this.room.players.length) {
            this.roundsPlayed += 1;
            this.currentPlayerDrawingIndex = 0;
            if(this.roundsPlayed == this.totalRounds) {
                this.announceWinner();
                return;
            }
        }
        this.setNewWord();
    }
}

module.exports = Game