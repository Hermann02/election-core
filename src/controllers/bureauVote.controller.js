const bureauVoteModel = require('../models/burreauVote');

exports.list = (req, res) => {
    bureauVoteModel.aggregate([
        {
            $addFields: {
                id: "$_id"
            }
        }
    ]).then((bureauVote) => {
        res.json({
            success: true,
            message: 'bureauVote List',
            data: bureauVote
        });
    })
        .catch((err => {
            if (err) {
                res.json({
                    success: false,
                    message: 'bureauVote List in empty',
                    data: []
                });
            }
        }))
};

exports.create = (req, res) => {
    const {
        nom, collegeType, listes, departement, electeurs,
    } = req.body;

    const bureauVote = {
        nom,
        collegeType,
        owner: req.user._id,
        listes,
        departement,
        electeurs,
    };

    const newbureauVote = new bureauVoteModel(bureauVote);

    newbureauVote
        .save()
        .then(bureauVote => {
            res.json({
                success: true,
                message: 'bureauVote add successfully',
                data: bureauVote
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
        listes,
        departement,
        electeurs,
    } = req.body;

    const newbureauVote = {
        nom,
        collegeType,
        owner,
        listes,
        departement,
        electeurs,
    };

    bureauVoteModel.findByIdAndUpdate(id, {$set: newbureauVote})
        .then((bureauVote) => {
            res.json({
                success: true,
                message: 'bureauVote updated successfully',
                data: bureauVote
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

exports.deleteBureauVote = (req, res) => {
    bureauVoteModel.findByIdAndDelete({_id: req.params.id})
        .then((bureauVote) => {
            res.json({
                success: true,
                message: 'bureauVote delete successfully',
                data: bureauVote
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
    bureauVoteModel.findOne({_id: req.params.id})
        .then((bureauVote) => {
            res.json({
                success: true,
                message: 'One bureauVote',
                data: bureauVote
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
