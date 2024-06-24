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
        userId: user._id,
        email: email,
      });

      await this.userService.addUserToToken(user, token);

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hora
        sameSite: 'strict'
      });

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

      res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

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

  async getUserProfile(req, res) {
    try {
      const user = await this.userService.getUserProfile(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let response = {
        _id: user._id,
        name: user.name,
        bio: user.bio,
        captures: user.captures,
        videos: user.videos,
        articles: user.articles,
        reviews: user.reviews,
        guides: user.guides,
        artwork: user.artwork,
        friends: user.friends,
        wishlist: user.wishlist,
        library: user.library,
      };

      if (user.privacySettings.showEmail) {
        response.email = user.email;
      }

      if (user.privacySettings.showProfileImage) {
        response.profileImage = user.profileImage;
      }

      if (user.privacySettings.showWishlist) {
        response.wishlist = user.wishlist;
      } else {
        response.wishlist = [];
      }

      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async updateUserProfile(req, res) {
    try {
      const updatedUser = await this.userService.updateUserProfile(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async addAttributeToUser(req, res) {
    try {
      const { attribute, value } = req.body;
      const updatedUser = await this.userService.addAttributeToUser(req.params.id, attribute, value);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};