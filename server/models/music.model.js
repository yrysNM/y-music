const mongoose = require("mongoose");

const Music = new mongoose.Schema({
    musicName: { type: String, required: true },
    artist: { type: String, required: true },

})