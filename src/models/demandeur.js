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
    sexe: {
        type: String
    },
    telephone: {
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
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default : false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Demandeur", usersSchema);
