const mongoose = require('mongoose');

const model = new mongoose.Schema({
    _id: { type: String, required: false },
    guildid: { type: String },
    blacklisted: { type: Boolean, default: false }
})

module.exports = mongoose.model(`userDB`, model)