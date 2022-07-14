
const User = require("../models/users");
const {sendWelcomeEmail, sendPasswordResetEmail} = require("../utils/mail");
const validator = require("validator");
exports.signup = async (req, res, next) => {
    try {
        const propertiesArray = ['nom', 'prenom', 'email','phone','departement','userType', 'confirmedPassword', 'password'];

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


        // await sendWelcomeEmail({
        //     email: user.email,
        //     emailsSubject: 'Account verification',
        //     emailText: 'Please verify your email account',
        //     token,
        // });

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
