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
    dossier: {
        type: String
    },
    departement: {
        type: String
    },
    candidats: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Listes", usersSchema);
