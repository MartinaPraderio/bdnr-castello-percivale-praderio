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

  async addAttributeToUser(userId, attribute, value) {
    try {
      const update = {};
      update[attribute] = value;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: update },
        { new: true, runValidators: true } // `new: true` para devolver el documento actualizado
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      return updatedUser;
    } catch (error) {
      throw new Error(`Error adding attribute to user: ${error.message}`);
    }
  }

};