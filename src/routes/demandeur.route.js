const express = require('express');
const router = express.Router();
const {deleteDemandeur , list , single} = require('../controllers/demandeur.controller');

// router.post("/create" , create);
// router.post("/:id/update" , update);
router.get("/:id/single" , single);
router.get("/:id/delete" , deleteDemandeur);
router.get("/list" , list);

module.exports = router;
