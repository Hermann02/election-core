const express = require('express');
const router = express.Router();
const {create , deleteDepartement , list , single , update} = require('../controllers/departement.controller');

router.post("/create" , create);
router.post("/:id/update" , update);
router.get("/:id/single" , single);
router.get("/:id/delete" , deleteDepartement);
router.get("/list" , list);

module.exports = router;
