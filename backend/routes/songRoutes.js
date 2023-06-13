// in songRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/isAuthenticated");

module.exports = function (s3) {
  router.post("/register", (req, res) => {
    // you can use s3 in your route handler here
    // for example:
    // const params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
    // s3.upload(params, function(err, data) { /* handle error or use data */ });
  });
  router.post("/login", (req, res) => {
    // you can use s3 in your route handler here
  });
  router.get(
    "/protected",
    UserController.authMiddleware,
    UserController.getUserFromToken
  );
  router.get("/:id", authMiddleware, UserController.getUserById);
  // add more routes here...
  return router;
};
