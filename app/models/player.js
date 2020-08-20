class Player {
	
    constructor(playerName, isAdmin, scoketId) {
        this.playerName = playerName;
        this.isAdmin = isAdmin;
        this.points = 0;
        this.scoketId = scoketId;
        this.guessStatus = false;
    }

    getSocketId() {
        return this.scoketId;
    }
}

module.exports = Player
