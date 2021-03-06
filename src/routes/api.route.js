const express = require("express");
const router = express.Router();

// const userRoute = require('./user.route');
const regionRoute = require('./region.route');
const departementRoute = require('./departement.route');
const communeRoute = require('./commune.route');
const demandeurRoute = require('./demandeur.route');
const listeRoute = require('./liste.route');
const candidatRoute = require('./candidat.route');
const userRoute = require('./user.route');
const electeurRoute = require('./electeur.route');
const bvRoute = require('./bureauVote.route');

// router.use('/users', userRoute);
router.use('/regions', regionRoute);
router.use('/departements', departementRoute);
router.use('/communes', communeRoute);
router.use('/candidats', candidatRoute);
router.use('/listes', listeRoute);
router.use('/demandeur', demandeurRoute);
router.use('/users', userRoute);
router.use('/electeurs', electeurRoute);
router.use('/bureauVote', bvRoute);


module.exports = router;
