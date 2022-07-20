const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    profession: {
        type: String,
    },
    sexe: {
        type: String,
    },
    lieu: {
        type: String
    },
    date: {
        type: String
    },
    dossier: {
        type: String
    },
    status: {
        type: String,
        default: "En Attente"
    },
    commune: {
        type: String
    },
    observation: {
        type: String
    },
    ordre: {
        type: Number,
    },
    owner: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Candidats", usersSchema);
