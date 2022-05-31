const express = require('express');
const router = express.Router();
const {create , deleteRegion , list , single , update} = require('../controllers/region.controller');

router.post("/create" , create);
router.post("/:id/update" , update);
router.get("/:id/single" , single);
router.get("/:id/delete" , deleteRegion);
router.get("/list" , list);

module.exports = router;
