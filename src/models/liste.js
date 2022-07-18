const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nom: {
        type: String
    },
    collegeType: {
        type: String
    },
    owner: {
        type: String
    },
    status: {
        type: String,
        default: 'En attente'
    },
    departement: {
        type: String
    },
    candidats: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Listes", usersSchema);
