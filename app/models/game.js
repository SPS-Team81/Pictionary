var fs = require("fs");

class Game {
    constructor(room,roundDuration,totalRounds) {
        this.roundDuration = parseInt(roundDuration);
        this.totalRounds = parseInt(totalRounds);
        this.room = room;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
        this.unusedWords = ['car','bus','road','light','pen'];
        this.currentWord = '';
        this.gameEnded = false;
        this.endTime = new Date();

        // this.fetchWords();
    }

    fetchWords() {
        var text = fs.readFileSync("words.txt");
        text = text+"";
        this.unusedWords = text.split("\n")
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

    getEndTime() {
        return this.endTime;
    }

    setEndTime() {
        var dt = new Date();
        dt.setSeconds(dt.getSeconds() + this.getRoundDuration() + 3);
        this.endTime = dt;
    }

    setNewWord() {
        var index = Math.floor((Math.random() * this.unusedWords.length));
        this.currentWord = this.unusedWords[index];

        for(var i = index;i<this.unusedWords.length - 1;i++) {
            this.unusedWords[i] = this.unusedWords[i+1];
        }
        this.unusedWords.pop();

        console.log("Length of unused Words: "+this.unusedWords.length);

        if(this.unusedWords.length == 0) {
            // this.fetchWords();
        }
    }

    addGain() {
        for(var i = 0;i<this.room.players.length;i++) {
            this.room.players[i].points = this.room.players[i].points + this.room.players[i].gain;
		    this.room.players[i].gain = 0;
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
        // this.setNewWord();
    }
}

module.exports = Game