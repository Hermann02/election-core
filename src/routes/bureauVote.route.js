const express = require('express');
const router = express.Router();
const bvController = require('../controllers/bureauVote.controller');
const {auth} = require('../middlewares/auth');

router.post("/create", auth, bvController.create);
router.post("/:id/update", bvController.update);
router.get("/:id/delete", bvController.deleteBureauVote);
router.get("/list", bvController.list);

module.exports = router;
