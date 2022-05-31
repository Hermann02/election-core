const departementModel = require('../models/departement');

exports.list = (req, res) => {
    departementModel.find({})
        .then((departement) => {
            res.json({
                success: true,
                message: 'departement List',
                data: departement
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'departement List in empty',
                    data: []
                });
            }
        }))
};

exports.create = (req, res) => {
    const {
        name,
        region,
    } = req.body;

    const departement = {
        name,
        region,
    };

    const newdepartement = new departementModel(departement);

    newdepartement
        .save()
        .then(departement => {
            res.json({
                success: true,
                message: 'departement add successfully',
                data: departement
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
        region,
    } = req.body;

    const newdepartement = {
        name,
        region,
    };

    departementModel.findByIdAndUpdate(id, {$set: newdepartement})
        .then((departement) => {
            res.json({
                success: true,
                message: 'departement updated successfully',
                data: departement
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

exports.deleteDepartement = (req, res) => {
    departementModel.findByIdAndDelete({_id: req.params.id})
        .then((departement) => {
            res.json({
                success: true,
                message: 'departement delete successfully',
                data: departement
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
    departementModel.findOne({_id: req.params.id})
        .then((departement) => {
            res.json({
                success: true,
                message: 'One departement',
                data: departement
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
