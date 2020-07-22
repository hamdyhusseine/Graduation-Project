
const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId
const moment = require('moment')

const admin = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: { type: Boolean, default: true },
    createdAt: {
        type: String,
        default: moment(Date.now()).format('DD-MM-YYYY hh:mm:ss A')
    },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('admin', admin);