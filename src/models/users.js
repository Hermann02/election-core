const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
    },
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    commune: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    emailVerificationToken: String,
    emailResetToken: String,
    accountVerified: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});


usersSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        id: user.id
    }, process.env.APP_KEY);

    user.tokens = user.tokens.concat({
        token
    });

    await user.save();
    const one = await user.findOne({
        _id: user.id
    });

    return {user: one, token}
};


usersSchema.methods.generateEmailVerificationToken = async function () {
    const user = this;
    const hashedEmail = await bcrypt.hash(user.email, 8);
    const token = jwt.sign({
        token: hashedEmail
    }, process.env.APP_KEY, {
        expiresIn: 60 * 30
    });

    user.emailVerificationToken = token;
    await user.save();

    return token;
};

//function to generate email reset token
usersSchema.methods.generateEmailResetToken = async function () {
    const user = this;
    const hashedEmail = await bcrypt.hash(user.email, 8);
    const token = jwt.sign({
        token: hashedEmail
    }, process.env.APP_KEY, {
        expiresIn: 60 * 30
    });

    user.emailResetToken = token;
    await user.save();

    return token
};


//check if users email is not already in use
userSchema.statics.checkEmailInUse = async (email) => {
    const user = await User.findOne({
        email
    });
    if (user) {
        return user
    }
    return;
};


//find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email,
        accountVerified: true,
    });

    if (!user) {
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return;
    }

    return user;
};

//Hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

const User = mongoose.model("Users", usersSchema);
module.exports = User;
