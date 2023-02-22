const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    area: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Data'
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;