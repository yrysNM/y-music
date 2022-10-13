const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

var _db;
async function main() {
    await mongoose.connect(process.env.MONGO_URI, (err, database) => {
        if (err) {
            console.log("MongoDB connection error." + err);
            process.exit(1);
        }
        _db = database.db("tracks");
    });
    console.log("connected to databse");
}
module.exports = { _db, main };