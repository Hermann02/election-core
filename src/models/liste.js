const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
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
    candidates: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Listes", usersSchema);
