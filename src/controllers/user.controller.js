const User = require("../models/users");
const {sendWelcomeEmail, sendPasswordResetEmail} = require("../utils/mail");
const validator = require("validator");

exports.signup = async (req, res, next) => {
    try {
        const propertiesArray = ['nom', 'prenom', 'email','phone','commune','userType', 'confirmedPassword', 'password'];

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

        console.log(token);


        await sendWelcomeEmail({
            email: user.email,
            emailsSubject: 'Account verification',
            emailText: 'Please verify your email account',
            token,
        });

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
                message: "Invalid Email",
                data: null
            });
        }


        const token = await user.generateAuthToken();

        await res.json({
            success: true,
            message: "Login success",
            data: token
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

exports.getMembers = async (req, res, next) => {
    try {
        const result = await User.find();
        await res.json({
            success: true,
            message: "Members list",
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
            req.User[property] = req.body[property];
        });

        await req.User.save();

        await res.json({
            success: true,
            message: "Profile Updated",
            data: req.User
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
        const User = await User.findByCredentials(req.User.email, req.body.oldPassword);
        if (!User) {

            await res.json({
                success: false,
                message: "No member found"
            });
        }
        console.log(User);
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

        req.User.password = req.body.password;
        await req.User.save();


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
