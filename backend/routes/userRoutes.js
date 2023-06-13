const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/isAuthenticated");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.checkUser);
router.get(
  "/protected",
  UserController.authMiddleware,
  UserController.getUserFromToken
);
router.get("/:id", authMiddleware, UserController.getUserById);

module.exports = router;
