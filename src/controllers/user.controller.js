const User = require("../models/users");
const validator = require("validator");

exports.signup = async (req, res, next) => {
    try {
        const propertiesArray = ['nom', 'prenom', 'email', 'phone', 'departement', 'userType', 'confirmedPassword', 'password'];

        for (const prop of Object.keys(req.body)) {
            if (!propertiesArray.includes(prop)) {
                await res.json({
                    success: false,
                    message: "champs incorrects"
                });
            }
        }

        const emailInUse = await User.checkEmailInUse(req.body.email);


        if (emailInUse) {
            await res.json({
                success: false,
                message: "email dejà utilisé",
            });
        }

        if (!validator.equals(req.body.password, req.body.confirmedPassword)) {

            await res.json({
                success: false,
                message: "Passwords do not match",
            });

        }


        const user = new User(req.body);
        const token = await user.generateEmailVerificationToken();


        await res.json({
            success: true,
            message: "Email sent",
            data: user
        });

    } catch (error) {
        await res.json({
            success: false,
            message: "erreur",
            error: error
        });
    }

};

exports.emailVerification = async (req, res, next) => {
    try {
        req.user.accountVerified = true;
        req.user.emailVerificationToken = null;
        await req.user.save();

        await res.json({
            success: true,
            message: "account verified",
            data: req.user
        });

    } catch (error) {

        await res.json({
            success: false,
            message: error,
            data: null
        });
    }
};

exports.signin = async (req, res, next) => {
    try {
        const email = validator.escape(req.body.email);


        if (!validator.isEmail(email)) {

            await res.json({
                success: false,
                message: "Invalid Email",
                data: null
            });

        }

        const user = await User.findByCredentials(email, req.body.password);
        if (!user) {
            await res.json({
                success: false,
                message: "Bad credentials",
                data: null
            });
        } else {
            console.log(user.type);
            const token = await user.generateAuthToken();

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
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();

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


exports.forgottenPasswordemailVerification = async (req, res, next) => {
    try {

        const user = await User.checkEmailInUse(req.body.email);
        if (!user) {
            await res.json({
                success: false,
                message: "No email account"
            });
        }

        const token = await user.generateEmailResetToken();

        await sendPasswordResetEmail({
            email: user.email,
            emailsSubject: 'Password reset',
            emailText: 'Follow the link to reset your password.This email is valid for the next thirty minutes',
            token,
        });

        await res.json({
            success: true,
            message: "Email sent"
        });

    } catch (e) {
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};

exports.passwordReset = async (req, res, next) => {
    try {

        if (!validator.isStrongPassword(req.body.password, {
            minSymbols: 0
        })) {
            await res.json({
                success: false,
                message: "password is not strong enough",
            });
        }

        req.user.password = req.body.password;
        req.user.emailResetToken = null;

        await req.user.save();

        await res.json({
            success: true,
            message: "Password reset",
        });

    } catch (e) {
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};


exports.getProfile = async (req, res, next) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.json({
            res,
            statusCode: 500
        });
    }
};


exports.update = async (req, res) => {
    const id = req.params.id;

    const propertiesArray = ['nom', 'prenom', 'email', 'phone', 'departement', 'userType'];

    for (const prop of Object.keys(req.body)) {
        if (!propertiesArray.includes(prop)) {
            await res.json({
                success: false,
                message: "champs incorrects"
            });
        }
    }

    const {
        nom,prenom, email, phone, departement, userType
    } = req.body;

    const newuser = {
        nom,prenom, email, phone, departement, userType
    };

    User.findByIdAndUpdate(id, {$set: newuser})
        .then((user) => {
            res.json({
                success: true,
                message: 'user updated successfully',
                data: user
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

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete({_id: req.params.id})
        .then((user) => {
            res.json({
                success: true,
                message: 'user delete successfully',
                data: user
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
    User.findOne({_id: req.params.id})
        .then((user) => {
            res.json({
                success: true,
                message: 'One user',
                data: user
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

exports.getUsers = async (req, res, next) => {
    try {
        const result = await User.aggregate([
            {
                $addFields: {
                    id: "$_id"
                }
            }
        ]);
        await res.json({
            success: true,
            message: "Users list",
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

exports.updateProfile = async (req, res, next) => {
    try {
        const propertiesArray = ['firstname', 'lastname'];

        for (const prop of Object.keys(req.body)) {
            if (!propertiesArray.includes(prop)) {
                return invalidData({
                    res,
                    error: 'Properties do not match'
                });
            }
        }

        propertiesArray.forEach((property) => {
            req.user[property] = req.body[property];
        });

        await req.user.save();

        await res.json({
            success: true,
            message: "Profile Updated",
            data: req.user
        });
    } catch (e) {
        console.log(e);
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }

};


exports.modifyPassword = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.user.email, req.body.oldPassword);
        if (!user) {

            await res.json({
                success: false,
                message: "No member found"
            });
        }
        console.log(user);
        if (!validator.equals(req.body.password, req.body.confirmedPassword)) {

            await res.json({
                success: false,
                message: "Password don't match"
            });
        }

        if (!validator.isStrongPassword(req.body.password, {
            minSymbols: 0
        })) {

            await res.json({
                success: false,
                message: "Password is not strong enough",
            });
        }

        req.user.password = req.body.password;
        await req.user.save();


        await res.json({
            success: true,
            message: "Password changed"
        });

    } catch (e) {
        await res.json({
            success: false,
            message: "Error",
            data: e
        });
    }
};
