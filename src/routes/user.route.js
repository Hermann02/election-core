const express = require("express");
const Routeur = express.Router();
const UserController = require("../controllers/user.controller");
const {auth} = require("../middlewares/auth");

Routeur.post("/signin",UserController.signin);
Routeur.post("/signup", UserController.signup);
Routeur.post("/signout",auth ,UserController.signout);
Routeur.get("/list",UserController.getUsers);
Routeur.post("/:id/update",UserController.update);
Routeur.get("/:id/delete",UserController.deleteUser);


module.exports = Routeur;
