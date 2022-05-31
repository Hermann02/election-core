const express = require("express");
const router = express.Router();

const userRoute = require('./user.route');
const regionRoute = require('./region.route');
const departementRoute = require('./departement.route');
const communeRoute = require('./commune.route');

router.use('/users',  userRoute);
router.use('/regions',  regionRoute);
router.use('/departements',  departementRoute);
router.use('/communes',  communeRoute);


module.exports = router;
