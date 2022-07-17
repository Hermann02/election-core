const express = require('express');
const router = express.Router();
const {create, deleteCandidat, list, single, update, getFiles} = require('../controllers/candidat.controller');
const {auth} = require('../middlewares/auth');
const upload = require('./../utils/multer');

router.post("/create", auth, create);
router.post("/upload", upload.single('file'), getFiles);
router.post("/:id/update", update);
router.get("/:id/single", single);
router.get("/:id/delete", deleteCandidat);
router.get("/list", list);

module.exports = router;
