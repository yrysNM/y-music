require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const multer = require("multer");
const { Readable } = require("stream");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;
const trackClassRouter = require("./routes/track.router");
const dbo = require("./db");

const trackRouter = express.Router();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tracks", trackRouter);
app.use("/song", trackClassRouter);

dbo.main();
// const DB = process.env.MONGO_URI;
// var _db;
// MongoClient.connect(DB, (err, database) => {
//     if (err) {
//         console.log("MongoDB connection error. please make sure that. MongoDB is rinning");
//         process.exit(1);
//     }
//     _db = database.db("tracks");
//     console.log("connected with db: " + database.db("tracks"));
// });


trackRouter.get("/:trackID", (req, res) => {
    try {
        var trackID = new ObjectID(req.params.trackID);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid trackid in URL paramter."
        })
    }
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    let bucket = new mongodb.GridFSBucket(_db, {
        bucketName: "tracks"
    });

    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on("data", (chunk) => {
        res.write(chunk);
    });

    downloadStream.on("error", () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });

});

trackRouter.post("/", (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: {
            fields: 1,
            fileSize: 60000000,
            files: 1,
            parts: 5
        }
    });

    upload.single("track")(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "Upload request Validation Failed" + err
            });
        } else if (!req.body.name) {
            return res.status(400).json({
                message: "No track name in request body"
            });
        }

        let trackName = req.body.name;

        // convert to buffer 
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        let bucket = new mongodb.GridFSBucket(_db, {
            bucketName: "tracks"
        });

        let uploadStream = bucket.openUploadStream(trackName);
        let id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        uploadStream.on("error", () => {
            return res.status(500).json({
                message: "Error upload file."
            });
        })

        uploadStream.on("finish", () => {
            return res.status(201).json({
                message: "File upload succesfully, stored under Mongo ObjectID: " + id
            });
        });
    });
})



app.listen(PORT, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`Server started on ${PORT}`);
})