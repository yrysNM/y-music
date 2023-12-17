const mongoose = require("mongoose");
require("dotenv").config({ path: "./.local.env" });

const client = new mongoose.mongo.MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;
async function main() {
  await mongoose.connect(process.env.MONGO_URI, (err, database) => {
    if (err) {
      console.log("MongoDB connection error." + err);
      process.exit(1);
    }
  });
  console.log("connected to databse");
}

module.exports = {
  connectToServer: function (callback) {
    client.connect((err, database) => {
      if (database) {
        _db = database.db("tracks");
        console.log("Successfully, connected to MongoDB");
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
  main: main,
};
