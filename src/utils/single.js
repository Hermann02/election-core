// const Role = require("../models/role");
// const Tour = require("../models/tour")
// const Privilege = require("../models/privilege")
// const Affiliation = require("../models/affiliation");
// const Publication = require("../models/publication");
// const Reunion = require('./../models/reunion')
// const Sanction = require("../models/sanction");
// const Seance = require("../models/seance");
// const Transaction = require('./../models/transaction')
//
// exports.getPrivilege = (req, res, next) => {
//     const id = req.params.id;
//
//     Privilege.findById(id)
//         .then((privilege) => {
//             req.privilege = privilege;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
// exports.getSeance = (req, res, next) => {
//     const id = req.params.id;
//
//     Seance.findById(id)
//         .then((seance) => {
//             req.seance = seance;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
// exports.getSanction = (req, res, next) => {
//     const id = req.params.id;
//
//     Sanction.findById(id)
//         .then((sanction) => {
//             req.sanction = sanction;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
//
// exports.getAffiliation = (req, res, next) => {
//     const id = req.params.id;
//
//     Affiliation.findById(id)
//         .then((affiliation) => {
//             req.affiliation = affiliation;
//             next();
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
// exports.getPublication = (req, res, next) => {
//     const id = req.params.id;
//
//     Publication.findById(id)
//         .then((publication) => {
//             req.publication = publication;
//             next();
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
//
// exports.getReunion = (req, res, next) => {
//     const id = req.params.id;
//
//     Reunion.findById(id)
//         .then((reunion) => {
//             req.reunion = reunion;
//             next();
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
//
// exports.verifyReunionCode = (req , res , next) => {
//     const code = req.params.code
//     Reunion.findOne({code})
//         .then(reunion => {
//             req.reunion = reunion
//             next()
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
//
// exports.getRole = (req, res, next) => {
//     const id = req.params.id;
//
//     Role.findById(id)
//         .then((role) => {
//             req.role = role;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
//
// exports.getTour = (req, res, next) => {
//     const id = req.params.id;
//
//     Tour.findById(id)
//         .then((tour) => {
//             req.tour = tour;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
//
// exports.getTransaction = (req, res, next) => {
//     const id = req.params.id;
//
//     Transaction.findById(id)
//         .then((transaction) => {
//             req.transaction = transaction;
//             next();
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//                 data: null
//             })
//         })
// }
