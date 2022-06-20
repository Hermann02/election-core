const regionModel = require('../models/region');

exports.list = (req, res) => {
    regionModel.find({})
        .then((region) => {
            res.json({
                success: true,
                message: 'region List',
                data: region
            });
        })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'region List in empty',
                    data: []
                });
            }
        }))
};

exports.create = (req, res) => {
    const {
        nom
    } = req.body;

    const region = {
        nom,
    };
    console.log(req.body)
    const newregion = new regionModel(region);

    newregion
        .save()
        .then(region => {
            res.json({
                success: true,
                message: 'region add successfully',
                data: region
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
        nom
    } = req.body;

    const newregion = {
        nom
    };

    regionModel.findByIdAndUpdate(id, {$set: newregion})
        .then((region) => {
            res.json({
                success: true,
                message: 'region updated successfully',
                data: region
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

exports.deleteRegion = (req, res) => {
    regionModel.findByIdAndDelete({_id: req.params.id})
        .then((region) => {
            res.json({
                success: true,
                message: 'region delete successfully',
                data: region
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
    regionModel.findOne({_id: req.params.id})
        .then((region) => {
            res.json({
                success: true,
                message: 'One region',
                data: region
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
