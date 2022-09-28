const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to databse");
}

module.exports = main;