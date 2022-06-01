const listeModel = require('../models/liste');

exports.list = (req, res) => {
    listeModel.find({})
        .then((liste) => {
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
        name,
        collegeType,
        owner,
        dossier,
        departement,
        candidates
    } = req.body;

    const liste = {
        name,
        collegeType,
        owner,
        dossier,
        departement,
        candidates
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
        name,
        collegeType,
        owner,
        dossier,
        departement,
        candidates
    } = req.body;

    const newliste = {
        name,
        collegeType,
        owner,
        dossier,
        departement,
        candidates
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
