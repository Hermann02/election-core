const mongoose = require("mongoose");
const connectionUrl = 'mongodb://localhost:27017/election';
//const connectionUrl = "mongodb+srv://dagen:Dagen1607@todo-list.yqi65.mongodb.net/Elatan?retryWrites=true&w=majority"


mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;
