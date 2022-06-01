const candidatModel = require('../models/candidat');

exports.list = (req, res) => {
    candidatModel.find({})
        .then((candidat) => {
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

exports.create = (req, res) => {
    const {
        firstName,
        lastName,
        profession,
        commune,
        ordre
    } = req.body;

    const candidat = {
        firstName,
        lastName,
        profession,
        commune,
        ordre
    };

    const newcandidat = new candidatModel(candidat);

    newcandidat
        .save()
        .then(candidat => {
            res.json({
                success: true,
                message: 'candidat add successfully',
                data: candidat
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
        firstName,
        lastName,
        profession,
        commune,
        ordre
    } = req.body;

    const newcandidat = {
        firstName,
        lastName,
        profession,
        commune,
        ordre
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
