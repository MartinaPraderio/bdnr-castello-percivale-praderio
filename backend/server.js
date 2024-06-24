const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./src/controllers/router");
const errorLogger = require("./logger/errorLogger").getInstance();
const activityLogger = require("./logger/activityLogger").getInstance();
const { User } = require("./entities/user");
const UserRepository = require("./src/repositories/userRepository");
const cors = require("cors");
require("dotenv").config();
const redisClient = require('./config/redisClient');
const cookieParser = require('cookie-parser');

const app = express();


app.use(
  cors({
    origin: "*",
  })
);

redisClient.connect().catch(console.error);
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);


app.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    const healthDetails = {
      status: "OK",
      version: "1.0.0",
      lastChecked: new Date(),
      databaseStatus: "Connected",
    };

    activityLogger.log({
      action: "Health Check",
      message: "Database connection OK",
      user: "System",
    });
    res.status(200).json(healthDetails);
  } catch (error) {
    const data = { message: error.message };
    errorLogger.log(data);
    res.status(500).json({ status: "Database connection error" });
  }
});

const userRepository = new UserRepository();

const createDefaultAdmin = async function () {
  try {
    const admin = await userRepository.find("admin@ort.com", "Password1");
    if (!admin) {
      const adminUser = new User({
        name: "Admin",
        email: "admin@ort.com",
        password: "Password1",
        role: "Admin",
      });
      await userRepository.create(adminUser);
      console.log("Default admin created");
    }
  } catch (err) {
    console.log(err);
  }
};

try {
  // let connectionString = process.env.MONGO_CONNECTION_STRING; 
  let connectionString = 'mongodb://localhost:27017/Users';
  mongoose.connect(connectionString, { connectTimeoutMS: 30000 }).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
  console.log("Database connected");
  createDefaultAdmin();
} catch (err) {
  console.log(err);
}

module.exports = app;