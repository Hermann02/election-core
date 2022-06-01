const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: {
        type : String,
    },
    lastName: {
        type : String,
    },
    profession: {
        type : String,
    },
    commune: {
        type: String
    },
    ordre: {
        type: Number
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Candidats", usersSchema);
