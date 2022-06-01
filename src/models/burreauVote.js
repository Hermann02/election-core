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
    vote: {
        type: Object
    },
    departement: {
        type: String
    },
    listes: {
        type: Object
    },
    electeurs: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("bureauxVote", usersSchema);
