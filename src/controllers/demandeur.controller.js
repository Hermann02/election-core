const demandeurModel = require('../models/demandeur');

exports.list = (req, res) => {
    demandeurModel.find({})
        .then((demandeur) => {
            res.json({
                success: true,
                message: 'demandeur List',
                data: demandeur
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'demandeur List in empty',
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
