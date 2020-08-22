var fs = require("fs");

class Game {
    constructor(room,roundDuration,totalRounds) {
        this.roundDuration = roundDuration;
        this.totalRounds = totalRounds;
        this.room = room;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
        this.unusedWords = [];
        this.currentWord = '';
        this.gameEnded = false;
        this.endTime = new Date();

        this.fetchWords();
    }

    fetchWords() {
        fs.readFile("../../words.txt", function(text){
            text = text+"";
            this.unusedWords = text.split("\n")
        });
        // console.log(this.unusedWords);
    }

    resetGame() {
        for (index = 0; index < this.room.players.length; index++) {
            this.room.players[index].points = 0;
        }
        this.resetGuess();
        this.gameEnded = false;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
    }

    getCurrentPlayerDrawingIndex() {
        return this.currentPlayerDrawingIndex;
    }

    getCurrentWord() {
        return this.currentWord;
    }

    getRoundDuration(){
        return this.roundDuration;
    }

    getTotalRounds() {
        return this.totalRounds;
    }

    setEndTime() {
        var dt = new Date();
        dt.setSeconds(dt.getSeconds() + this.getRoundDuration);
        this.endTime = dt;
    }

    setNewWord() {
        this.currentWord = this.unusedWords[Math.floor((Math.random() * this.unusedWords.length))];
        this.unusedWords.remove(this.currentWord);
        if(this.unusedWords.length == 0) {
            this.fetchWords();
        }
    }

    addGain() {
        for(var i = 0;i<this.room.players.length;i++) {
            thi.room.players[i].points = thi.room.players[i].points + thi.room.players[i].gain;
		    thi.room.players[i].gain = 0;
        }
    }

    resetGuess() {
        for (var i = 0;i<this.room.players.length;i++) {
            this.room.players[i].guessStatus = 0;
        }
    }


    nextTurn() {
        this.currentPlayerDrawingIndex += 1;
        if(this.currentPlayerDrawingIndex == this.room.players.length) {
            this.roundsPlayed += 1;
            this.currentPlayerDrawingIndex = 0;
            if(this.roundsPlayed == this.totalRounds) {
                // this.announceWinner();
                this.gameEnded = ture;
                return;
            }
        }
        this.setNewWord();
    }
}

module.exports = Game