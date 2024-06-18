const UserService = require("../services/userService");
const AuthService = require("../services/authService");
const errorLogger = require("../../logger/errorLogger").getInstance();
const authorizationLogger =
  require("../../logger/authLogger").getInstance();

module.exports = class UserController {
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async signup(req, res) {
    let errorCode = 401;
    try {
      const { userParams } = req.body;
      errorCode = 400;
      const user = await this.userService.signup(userParams);
      authorizationLogger.log({
        message: `User ${user.email} registered`,
      });
      res
        .status(201)
        .send({ status: 201, message: "User created successfully" });
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 11000 && error.keyPattern.email) {
        errorMessage = "Email already registered";
      }
      if (error.code === 11000 && error.keyPattern.invitationCodes) {
        errorMessage = "Invalid invitation code";
      }
      errorLogger.log(errorMessage);
      res.status(errorCode).send({ status: errorCode, message: errorMessage });
    }
  }

  async signin(req, res) {
    const { email, password } = req.body;
    let user;
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      user = await this.userService.signin(email, password);
      const token = await this.authService.generateToken({
        email: email,
      });

      await this.userService.addUserToToken(user, token);

      res.header("Authorization", token);
      authorizationLogger.log({
        message: `User ${email} logged in`,
      });
      res.send({ user: user });
    } catch (error) {
      errorLogger.log(error.message);
      res.status(401).send({ status: 401, message: error.message });
    }
  }

  async signout(req, res) {
    try {
      const { userId } = req.query;
      console.log(userId);
      const token = req.header("Authorization");

      const authInfo = this.authService.verifyToken(token);
      if (!authInfo) throw new Error("Invalid token");
      await this.userService.verifyUserToken(userId, token);

      const user = await this.userService.signOut(userId);
      authorizationLogger.log({
        message: `User ${user.email} logged out`,
      });
      res.send({ message: "Logout successful" });
    } catch (error) {
      errorLogger.log(error.message);
      res.status(401).send({ status: 401, message: error.message });
    }
  }


  
};