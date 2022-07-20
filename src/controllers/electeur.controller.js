const Electeur = require("../models/electeur");
const Demandeur = require("../models/demandeur");
const validator = require("validator");
exports.signup = async (req, res, next) => {
    try {
        const propertiesArray = ['code', 'userType', 'confirmedPassword', 'departement', 'password'];

        for (const prop of Object.keys(req.body)) {
            if (!propertiesArray.includes(prop)) {
                await res.json({
                    success: false,
                    message: "champs incorrects"
                });
            }
        }


        if (!validator.equals(req.body.password, req.body.confirmedPassword)) {

            await res.json({
                success: false,
                message: "Passwords do not match",
            });

        }


        const electeur = new Electeur(req.body);
        await user.save();

        await res.json({
            success: true,
            message: "inscription réussi",
            data: electeur
        });

        Demandeur.findOneAndUpdate({code: req.body.code}, {$set: {status: true}});
    } catch (error) {
        await res.json({
            success: false,
            message: "erreur",
            error: error
        });
    }

};


exports.signin = async (req, res, next) => {
    try {

        const electeur = await Electeur.findByCredentials(req.body.code, req.body.password);
        if (!electeur) {
            await res.json({
                success: false,
                message: "Bad credentials",
                data: null
            });
        } else {
            console.log(electeur.type);
            const token = await electeur.generateAuthToken();

            await res.json({
                success: true,
                message: "Login success",
                data: token
            });
        }

    } catch (e) {
        console.log(e);

        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};

exports.signout = async (req, res, next) => {
    console.log(req);
    try {
        req.electeur.tokens = req.electeur.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.electeur.save();

        await res.json({
            success: true,
            message: "Logged out"
        });
    } catch (e) {
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};


exports.getElecteurs = async (req, res, next) => {
    try {
        const result = await Electeur.aggregate([
            {
                $addFields: {
                    id: "$_id"
                }
            }
        ]);
        await res.json({
            success: true,
            message: "Electeurs list",
            data: result
        });

    } catch (e) {
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};
