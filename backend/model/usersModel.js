const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: { type: String, required: true },
    fullname: { type: String},
    password: { type: String, required: true },
});

module.exports = mongoose.model('users', usersSchema);
