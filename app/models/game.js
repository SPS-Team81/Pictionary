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

    getWords() {
        fs.readFile("../../words.txt", function(text){
            this.unusedWords = text.split("\n")
        });
    }

    resetGame() {
        for (const player of this.room.players) {
            player.points = 0;
        }
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
    }

    getCurrentPlayerDrawing() {
        return this.game.players[this.currentPlayerDrawingIndex];
    }

    getCurrentWord = function() {
        return this.currentWord;
    }

    getRoundDuration(){
        return this.roundDuration;
    }

    getTotalRounds() {
        return this.totalRounds;
    }

    setNewWord() {
        this.currentWord = this.unusedWords[Math.floor((Math.random() * this.unusedWords.length))];
        this.unusedWords.remove(this.currentWord);
    }

    nextTurn() {
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