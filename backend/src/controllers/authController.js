const AuthService = require("../services/authService");
const errorLogger = require("../../logger/errorLogger").getInstance();

module.exports = class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async verifyToken(req, res) {
    const token = req.headers.authorization;
    let payload = await this.authService.verifyToken(token);
    if (payload) {
      res.send({ payload: payload });
    } else {
      const data = { message: "Unauthorized" };
      errorLogger.log(data);
      res.status(401).send({ status: 401, message: "Unauthorized" });
    }
  }
};