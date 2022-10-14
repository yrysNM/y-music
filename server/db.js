const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

var _db;
async function main() {
    const conn = await mongoose.connect(process.env.MONGO_URI, (err, database) => {
        if (err) {
            console.log("MongoDB connection error." + err);
            process.exit(1);
        }
    });
    console.log("connected to databse");
}
mongoose.mongo.MongoClient.connect(process.env.MONGO_URI, (err, database) => {
    if (err) {
        console.log("MongoDB connection error. ", err);
        process.exit(1);
    }
    _db = database.db("tracks");
    console.log("connect with db: " + database.db("tracks"));
});


module.exports = { main, _db };