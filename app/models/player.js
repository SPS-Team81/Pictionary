class Player {
	
    constructor(playerName) {
        this.IS_DRAWING = 0;
        this.WAITING_TO_DRAW = 1;

        this.playerName = playerName;
        this.score = 0;
        this.guessedCorrect = false;
        this.playerState = this.WAITING_TO_DRAW;
    }
}

module.exports = Player
