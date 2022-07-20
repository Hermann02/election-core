const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electeursSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
    },
    password: {
        type: String
    },
    departement: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})


electeursSchema.methods.generateAuthToken = async function () {
    const electeur = this;
    console.log(electeur);
    const token = jwt.sign({
        id: electeur.id
    }, process.env.APP_KEY);

    electeur.tokens = electeur.tokens.concat({
        token
    });

    await electeur.save();
    const one = await Electeur.findOne({
        _id: electeur.id
    });

    return {electeur: one, token}
};


//find electeur by email and password
electeursSchema.statics.findByCredentials = async (code, password) => {
    const electeur = await Electeur.findOne({
        code
    });

    console.log('electeur', electeur);

    if (!electeur) {
        return;
    }
    const isMatch = await bcrypt.compare(password, electeur.password);

    if (!isMatch) {
        return;
    }

    return electeur;
};

//Hash password before saving
electeursSchema.pre('save', async function (next) {
    const electeur = this;

    if (electeur.isModified('password')) {

        electeur.password = await bcrypt.hash(electeur.password, 8)
    }

    next()
});

const Electeur = mongoose.model("Electeurs", electeursSchema);

module.exports = Electeur;
