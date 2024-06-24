const Game = require('../../entities/game');

module.exports = class GameService {
    async createGame(gameData) {
        const game = new Game(gameData);
        return await game.save();
    }

    async getGameById(gameId) {
        return await Game.findById(gameId);
    }

    async getAllGames() {
        return await Game.find();
    }

    async updateGame(gameId, gameData) {
        return await Game.findByIdAndUpdate(gameId, gameData, { new: true });
    }

    async deleteGame(gameId) {
        return await Game.findByIdAndDelete(gameId);
    }
};
