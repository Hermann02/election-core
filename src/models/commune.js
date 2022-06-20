const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    departement: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Communes", usersSchema);
