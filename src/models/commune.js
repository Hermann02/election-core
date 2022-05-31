const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String
    },
    departement: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Communes", usersSchema);
