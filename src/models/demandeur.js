const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    code: {
        type: String,
        required : true ,
        unique: true
    },
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    userType: {
        type: String
    },
    sexe: {
        type: String
    },
    picture: {
        type: String
    },
    phone: {
        type: String
    },
    profession: {
        type: String
    },
    dateNaissance: {
        type: String
    },
    pere: {
        type: String
    },
    mere: {
        type: String
    },
    dateInscription: {
        type: String
    },
    commune: {
        type: String
    },
    status: {
        type: Boolean,
        default : false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Demandeur", usersSchema);
