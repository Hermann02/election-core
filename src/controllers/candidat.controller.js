const candidatModel = require('../models/candidat');
const fs = require('fs');

exports.list = (req, res) => {
    candidatModel.aggregate([
        {
            $addFields: {
                id: "$_id"
            }
        }
    ]).then((candidat) => {
        res.json({
            success: true,
            message: 'candidat List',
            data: candidat
        });
    })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'candidat List in empty',
                    data: []
                });
            }
        }))
};

exports.getFiles = (req, res, next) => {
    console.log(req.file.path);
    res.json({
        success: true,
        message: 'candidat List in empty',
        data: req.file.path
    });
};

exports.create = (req, res, next) => {

    const {
        nom,
        prenom,
        profession,
        commune,
        ordre, dossier, sexe, date, lieu,
    } = req.body;

    const candidat = {
        nom,
        prenom,
        profession,
        commune,
        dossier, sexe, date, lieu,
        ordre,
        owner: req.user._id
    };

    const newcandidat = new candidatModel(candidat);
    console.log(newcandidat);
    newcandidat.save().then(candidat => {
        res.json({
            success: true,
            message: 'candidat add successfully',
            data: candidat
        });
    }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            message: err,
            data: null
        });
    })


};

exports.update = (req, res) => {
    const id = req.params.id;

    const {
        nom,
        prenom,
        profession,
        commune,
        ordre,
        dossier, sexe, date, lieu, statut, observation, owner

    } = req.body;

    const newcandidat = {
        nom,
        prenom,
        profession,
        commune,
        ordre,
        sexe,
        owner,
        dossier,
        lieu,
        date, statut, observation
    };

    candidatModel.findByIdAndUpdate(id, {$set: newcandidat})
        .then((candidat) => {
            res.json({
                success: true,
                message: 'candidat updated successfully',
                data: candidat
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: err,
                    data: null
                });
            }
        }))
};

exports.deleteCandidat = (req, res) => {
    candidatModel.findByIdAndDelete({_id: req.params.id})
        .then((candidat) => {
            res.json({
                success: true,
                message: 'candidat delete successfully',
                data: candidat
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: err,
                    data: null
                });
            }
        }))
};

exports.single = (req, res) => {
    candidatModel.findOne({_id: req.params.id})
        .then((candidat) => {
            res.json({
                success: true,
                message: 'One candidat',
                data: candidat
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: err,
                    data: null
                });
            }
        }))
};
