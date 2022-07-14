const communeModel = require('../models/commune');

exports.list = async (req, res) => {

    communeModel.aggregate([
        {
            $addFields: {
                id: "$_id"
            }
        }
    ]).then((commune) => {


        res.json({
            success: true,
            message: 'commune List',
            data: commune
        });
    })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'commune List in empty',
                    data: []
                });
            }
        }));


    // await res.json({
    //     success: true,
    //     message: 'commune List',
    //     data: commune
    // });

    // communeModel.find({})
    //     .then((commune) => {
    //
    //
    //         res.json({
    //             success: true,
    //             message: 'commune List',
    //             data: commune
    //         });
    //     })
    //     .catch((err => {
    //         if (err) {
    //             res.json({
    //                 success: false,
    //                 message: 'commune List in empty',
    //                 data: []
    //             });
    //         }
    //     }))
};

exports.create = (req, res) => {
    const {
        nom,
        departement,
    } = req.body;

    const commune = {
        nom,
        departement,
    };

    const newcommune = new communeModel(commune);

    newcommune
        .save()
        .then(commune => {
            res.json({
                success: true,
                message: 'commune add successfully',
                data: commune
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
        departement,
    } = req.body;

    const newcommune = {
        nom,
        departement,
    };

    communeModel.findByIdAndUpdate(id, {$set: newcommune})
        .then((commune) => {
            res.json({
                success: true,
                message: 'commune updated successfully',
                data: commune
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

exports.deletecommune = (req, res) => {
    communeModel.findByIdAndDelete({_id: req.params.id})
        .then((commune) => {
            res.json({
                success: true,
                message: 'commune delete successfully',
                data: commune
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
    communeModel.findOne({_id: req.params.id})
        .then((commune) => {
            res.json({
                success: true,
                message: 'One commune',
                data: commune
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
