const Router = require("express").Router;
const AuthController = require("./authController");
const UserController = require("./userController");

const router = new Router();
const auth = new AuthController();
const users = new UserController();

router.get("/verifyToken", (req, res) => auth.verifyToken(req, res));
router.post("/signup", (req, res) => users.signup(req, res));
router.post("/signin", (req, res) => users.signin(req, res));
router.delete("/signout", (req, res) => users.signout(req, res));
router.get("/users/:id", (req, res) => users.getUserProfile(req, res));
router.put("/users/:id", (req, res) => users.updateUserProfile(req, res));
router.put("/users/:id/addAttribute", (req, res) => users.addAttributeToUser(req, res));

module.exports = router;