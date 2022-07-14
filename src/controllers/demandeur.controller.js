const demandeurModel = require('../models/demandeur');

exports.create = (req, res) => {
    const {
        code,
        nom,
        prenom,
        sexe,
        telephone,
        profession,
        dateNaissance,
        pere,
        mere,
        dateInscription,
        commune,
        type,
    } = req.body;

    const demandeur = {
        code,
        nom,
        prenom,
        sexe,
        telephone,
        profession,
        dateNaissance,
        pere,
        mere,
        dateInscription,
        commune,
        type,
    };

    const newDemandeur = new demandeurModel(demandeur);

    newDemandeur
        .save()
        .then(demandeur => {
            res.json({
                success: true,
                message: 'demandeur add successfully',
                data: demandeur
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: err,
                data: null
            });
        })
};


exports.list = (req, res) => {
    demandeurModel.aggregate([
        {
            $addFields: {
                id: "$_id"
            }
        }
    ]).then((demandeur) => {
        res.json({
            success: true,
            message: 'liste des demandeurs',
            data: demandeur
        });
    })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'liste vide',
                    data: []
                });
            }
        }))
};


exports.deleteDemandeur = (req, res) => {
    demandeurModel.findByIdAndDelete({_id: req.params.id})
        .then((demandeur) => {
            res.json({
                success: true,
                message: 'demandeur delete successfully',
                data: demandeur
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


exports.update = (req, res) => {
    const id = req.params.id;

    const {
        code,
        nom,
        prenom,
        sexe,
        telephone,
        profession,
        dateNaissance,
        pere,
        mere,
        dateInscription,
        commune,
        type,
        status,
    } = req.body;

    const newdemandeur = {
        code,
        nom,
        prenom,
        sexe,
        telephone,
        profession,
        dateNaissance,
        pere,
        type,
        mere,
        dateInscription,
        commune,
        status
    };

    demandeurModel.findByIdAndUpdate(id, {$set: newdemandeur})
        .then((demandeur) => {
            res.json({
                success: true,
                message: 'demandeur updated successfully',
                data: demandeur
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
    demandeurModel.findOne({_id: req.params.id})
        .then((demandeur) => {
            res.json({
                success: true,
                message: 'One demandeur',
                data: demandeur
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
