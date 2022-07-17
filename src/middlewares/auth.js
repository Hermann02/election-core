const jwt = require('jsonwebtoken');

const User = require('../models/users');


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        const decoded = jwt.verify(token, process.env.APP_KEY);
        console.log(token, decoded, "token");
        const user = await User.findOne({
            _id: decoded.id,
            'tokens.token': token
        });

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;

        next()
    } catch (e) {
        console.log(e);
        res.json({
            success : false,
            message : e,
        })
    }
};


exports.verifyEmailVerificationToken = async (req, res, next) => {
    console.log(req.body);
    try {
        const token = req.body.token;
        jwt.verify(token, process.env.APP_KEY);
        const user = await user.findOne({
            emailVerificationToken: token,
        });
        if (!user) {
            throw new Error()
        }
        req.user = user;
        next()
    } catch (e) {
        console.log(e);
        res.json({
            success : false,
            message : e,
        })
    }
};

exports.verifyPaswordResetToken = async (req, res, next) => {

    try {
        const token = req.body.token;
        jwt.verify(token, process.env.APP_KEY);
        const user = await user.findOne({
            emailResetToken: token,
        });

        if (!user) {
            throw new Error()
        }

        req.user = user;
        next()
    } catch (e) {
        res.json({
            success : false,
            message : e,
        })
    }
};
