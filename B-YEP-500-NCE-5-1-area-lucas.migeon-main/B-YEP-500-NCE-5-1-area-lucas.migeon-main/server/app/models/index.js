const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGO } = require('../config');

const db = {};
db.mongoose = mongoose;

db.mongo = {
    user: require('./user.model'),
    data: require('./data.model')
}

db.start = async () => {
    await db.mongoose.connect(`mongodb://${MONGO.USER}:${MONGO.PWD}@${MONGO.HOST}:${MONGO.PORT}/${MONGO.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        throw "Database connection error: ", err;
    });
}

module.exports = db;