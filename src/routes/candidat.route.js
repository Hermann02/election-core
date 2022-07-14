const express = require('express');
const router = express.Router();
const {create , deleteCandidat , list , single , update} = require('../controllers/candidat.controller');
const {auth} = require('../middlewares/auth');

router.post("/create",auth , create);
router.post("/:id/update" , update);
router.get("/:id/single" , single);
router.get("/:id/delete" , deleteCandidat);
router.get("/list" , list);

module.exports = router;
