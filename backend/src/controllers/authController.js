const AuthService = require("../services/authService");
const errorLogger = require("../../logger/errorLogger").getInstance();

module.exports = class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async verifyToken(req, res, next) {
    const token = req.cookies.authToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      const data = { message: "Authentication token missing" };
      errorLogger.log(data);
      return res.status(401).send({ status: 401, message: "Authentication token missing" });
    }

    try {
      let payload = await this.authService.verifyToken(token);
      if (payload) {
        console.log("payload", payload)
        req.userData = { userId: payload.userId, email: payload.email };
        next();  // Llama a next() para continuar con la siguiente función de middleware
      } else {
        const data = { message: "Unauthorized" };
        errorLogger.log(data);
        res.status(401).send({ status: 401, message: "Unauthorized" });
      }
    } catch (err) {
      const data = { message: "Unauthorized", error: err.message };
      errorLogger.log(data);
      res.status(401).send({ status: 401, message: "Unauthorized" });
    }
  }
};
