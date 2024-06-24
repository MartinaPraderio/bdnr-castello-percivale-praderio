const Router = require("express").Router;
const AuthController = require("./authController");
const UserController = require("./userController");
const PermissionMiddleware = require('../middleware/permissionMiddleware');
const PermissionController = require('./permissionController');
const GameController = require("./gameController");

const router = new Router();
const auth = new AuthController();
const users = new UserController();
const permissionController = new PermissionController();
const permissionMiddleware = new PermissionMiddleware();
const games = new GameController();



router.get("/verifyToken", (req, res) => auth.verifyToken(req, res));
router.post("/signup", (req, res) => users.signup(req, res));
router.post("/signin", (req, res) => users.signin(req, res));
router.delete("/signout", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => users.signout(req, res));

// Rutas para gestionar permisos
router.post('/permissions', (req, res) => permissionController.createPermission(req, res));
router.put('/permissions/:id', (req, res) => permissionController.updatePermission(req, res));
router.delete('/permissions/:id', (req, res) => permissionController.deletePermission(req, res));
router.get('/permissions/:userId', (req, res) => permissionController.listPermissions(req, res));

router.get("/users/:id", (req, res, next) => auth.verifyToken(req, res, next), permissionMiddleware.checkPermission('canView'), (req, res) => users.getUserProfile(req, res));
router.put("/users/:id", (req, res, next) => auth.verifyToken(req, res, next), permissionMiddleware.checkPermission('canEdit'), (req, res) => users.updateUserProfile(req, res));
router.put("/users/:id/addAttribute", (req, res, next) => auth.verifyToken(req, res, next), permissionMiddleware.checkPermission('canEdit'), (req, res) => users.addAttributeToUser(req, res));


router.post("/games", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => games.createGame(req, res));
router.get("/games/:id", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => games.getGame(req, res));
router.get("/games", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => games.getAllGames(req, res));
router.put("/games/:id", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => games.updateGame(req, res));
router.delete("/games/:id", (req, res, next) => auth.verifyToken(req, res, next), (req, res) => games.deleteGame(req, res));

module.exports = router;