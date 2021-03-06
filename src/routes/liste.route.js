const express = require('express');
const router = express.Router();
const {create, deleteListe, list, single, update} = require('../controllers/liste.controller');
const {auth} = require('../middlewares/auth');

router.post("/create", auth, create);
router.post("/:id/update", update);
router.get("/:id/single", single);
router.get("/:id/delete", deleteListe);
router.get("/list", list);

module.exports = router;
