const express = require('express');
const router = express.Router();
const {create , deletecommune , list , single , update} = require('../controllers/commune.controller');

router.post("/create" , create);
router.post("/:id/update" , update);
router.get("/:id/single" , single);
router.get("/:id/delete" , deletecommune);
router.get("/list" , list);

module.exports = router;
