const { User } = require("../../entities/user");
const mongoose = require("mongoose");

module.exports = class UserRepository {
  constructor() { }

  async find(email, password) {
    return await User.findOne({ email: email, password: password });
  }

  async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(user) {
    return await user.save();
  }

  async addTokenToUser(user, token) {
    user.userToken = token;
    return await user.save();
  }

  async removeToken(userId) {
    const foundUser = await User.findOne({ _id: userId });
    foundUser.userToken = undefined;
    return await foundUser.save();
  }

  async verifyToken(userId, token) {
    const foundUser = await User.findOne({ _id: userId });
    return foundUser.userToken == token;
  }

  async findByIdAndUpdate(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

};