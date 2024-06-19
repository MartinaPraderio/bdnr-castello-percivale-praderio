const { User } = require("../../entities/user");
const UserRepository = require("./../repositories/userRepository");
require("dotenv").config();


module.exports = class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signin(email, password) {
    const user = await this.userRepository.find(email, password);
    if (!user) throw new Error("Invalid email or password");
    return user;
  }

  async addUserToToken(user, token) {
    return await this.userRepository.addTokenToUser(user, token);
  }

  async signup(userParams) {
    const user = new User({ ...userParams });
    const existentUser = await this.userRepository.findByEmail(user.email);
    if (!existentUser) {
      await this.userRepository.create(user);
    } else throw new Error("Email already registered");
    return user;
  }

  async signOut(userId) {
    return await this.userRepository.removeToken(userId);
  }

  async verifyUserToken(userId, token) {
    const tokenExists = await this.userRepository.verifyToken(userId, token);
    if (!tokenExists) throw new Error("Invalid token");
    else return tokenExists;
  }

  async getUserProfile(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  };

  async updateUserProfile(userId, updateData) {
    try {
      const updatedUser = await this.userRepository.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  async addAttributeToUser(userId, attribute, value) {
    try {
      const updatedUser = await this.userRepository.addAttributeToUser(userId, attribute, value);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }


};