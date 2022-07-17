const listeModel = require('../models/liste');

exports.list = (req, res) => {
    listeModel.aggregate([
        {
            $addFields: {
                id: "$_id"
            }
        }
    ]).then((liste) => {
        res.json({
            success: true,
            message: 'liste List',
            data: liste
        });
    })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'liste List in empty',
                    data: []
                });
            }
        }))
};

exports.create = (req, res) => {
    const {
        nom,
        collegeType,
        departement,
        candidats
    } = req.body;

    const liste = {
        nom,
        collegeType,
        departement,
        candidats,
        owner: req.user._id
    };

    const newliste = new listeModel(liste);

    newliste
        .save()
        .then(liste => {
            res.json({
                success: true,
                message: 'liste add successfully',
                data: liste
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

exports.update = (req, res) => {
    const id = req.params.id;

    const {
        nom,
        collegeType,
        owner,
        status,
        departement,
        candidats,
    } = req.body;

    const newliste = {
        nom,
        collegeType,
        owner,
        status,
        departement,
        candidats,
    };

    listeModel.findByIdAndUpdate(id, {$set: newliste})
        .then((liste) => {
            res.json({
                success: true,
                message: 'liste updated successfully',
                data: liste
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

exports.deleteListe = (req, res) => {
    listeModel.findByIdAndDelete({_id: req.params.id})
        .then((liste) => {
            res.json({
                success: true,
                message: 'liste delete successfully',
                data: liste
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
    listeModel.findOne({_id: req.params.id})
        .then((liste) => {
            res.json({
                success: true,
                message: 'One liste',
                data: liste
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
