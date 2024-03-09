const express = require("express");
const { route } = require("../app");

const router = express.Router();
const userController = require("../controllers/user.controller");
const jwtVerify = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");
const uploadImage = require("../middlewares/uploadUserImage");

T;
router.get("/users/:id?", userController.getUser);

router.post("/users", uploadImage, userController.createUser);

router.delete(
  "/users/:idUser",
  [jwtVerify, isAdmin],
  userController.deleteUser
);

router.put("/users/:id", [jwtVerify, uploadImage], userController.updateUser);

router.post("/login", userController.login);

router.get("/users/search/:search", userController.searchUser);

module.exports = router;
