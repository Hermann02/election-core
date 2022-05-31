const jwt = require('jsonwebtoken');

const Membre = require('../models/membre');


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.APP_KEY)
        console.log(token, decoded, "token");
        const membre = await Membre.findOne({
            _id: decoded.id,
            'tokens.token': token
        })

        if (!membre) {
            throw new Error()
        }

        req.token = token
        req.membre = membre

        next()
    } catch (e) {
        console.log(e)
        res.json({
            success : false,
            message : e,
        })
    }
}


exports.verifyEmailVerificationToken = async (req, res, next) => {
    console.log(req.body)
    try {
        const token = req.body.token;
        jwt.verify(token, process.env.APP_KEY)
        const membre = await Membre.findOne({
            emailVerificationToken: token,
        })
        if (!membre) {
            throw new Error()
        }
        req.membre = membre
        next()
    } catch (e) {
        console.log(e)
        res.json({
            success : false,
            message : e,
        })
    }
}

exports.verifyPaswordResetToken = async (req, res, next) => {

    try {
        const token = req.body.token;
        jwt.verify(token, process.env.APP_KEY)
        const membre = await Membre.findOne({
            emailResetToken: token,
        })

        if (!membre) {
            throw new Error()
        }

        req.membre = membre
        next()
    } catch (e) {
        res.json({
            success : false,
            message : e,
        })
    }
}