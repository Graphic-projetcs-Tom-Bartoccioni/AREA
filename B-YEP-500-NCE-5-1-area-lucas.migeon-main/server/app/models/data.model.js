const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "data: title required" ],
    },
    actionService: {
        type: String,
        required: [ true, "action: service required" ],
        enum: [ 'discord', 'youtube', 'timer', 'weather', 'randomUser' ]
    },
    action: {
        id: {
            type: Number,
            required: [ true, "action: id required" ],
            min: 0
        },
        title: {
            type: String,
            required: [ true, "action: title required" ],
        },
        description: {
            type: String,
            required: [ true, "action: description required" ],
        },
    },
    reactionService: {
        type: String,
        required: [ true, "reaction: service required" ],
        enum: ['discord']
    },
    reaction: {
        id: {
            type: Number,
            required: [ true, "reaction: id required" ],
            min: 0
        },
        title: {
            type: String,
            required: [ true, "reaction: title required" ],
        },
        description: {
            type: String,
            required: [ true, "reaction: description required" ],
        },
    },
    userId: {
        type: String,
        required: [ true, "userid: required" ],
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;