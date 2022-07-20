const express = require("express");
const Routeur = express.Router();
const ElecteurController = require("../controllers/electeur.controller");
const {authE} = require("../middlewares/auth");

Routeur.post("/signin", ElecteurController.signin);
Routeur.post("/signup", ElecteurController.signup);
Routeur.post("/signout", authE, ElecteurController.signout);
Routeur.get("/list", ElecteurController.getElecteurs);


module.exports = Routeur;
