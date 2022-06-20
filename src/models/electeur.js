const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    code: {
        type: String,
        required : true ,
        unique: true
    },
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    userType: {
        type: String
    },
    password: {
        type: String
    },
    picture: {
        type: String
    },
    phone: {
        type: String
    },
    commune: {
        type: String
    },
    status: {
        type: Boolean
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Electeurs", usersSchema);
