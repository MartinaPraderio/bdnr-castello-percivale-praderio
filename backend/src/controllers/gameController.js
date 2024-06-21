const GameService = require("../services/gameService");

module.exports = class GameController {
    constructor() {
        this.gameService = new GameService();
    }

    async createGame(req, res) {
        try {
            const game = await this.gameService.createGame(req.body);
            res.status(201).json(game);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getGame(req, res) {
        try {
            const game = await this.gameService.getGameById(req.params.id);
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.json(game);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAllGames(req, res) {
        try {
            const games = await this.gameService.getAllGames();
            res.json(games);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateGame(req, res) {
        try {
            const updatedGame = await this.gameService.updateGame(req.params.id, req.body);
            if (!updatedGame) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.json(updatedGame);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deleteGame(req, res) {
        try {
            const deletedGame = await this.gameService.deleteGame(req.params.id);
            if (!deletedGame) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.json({ message: 'Game deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
