const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String
    },
    userType: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    picture: {
        type: String
    },
    phone: {
        type: String
    },
    commune: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", usersSchema)
