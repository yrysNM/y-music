const mongoose = require("mongoose");
const multer = require("multer");
const ObjectID = require("mongodb").ObjectId;
const { _db } = require("../db");
const { Readable } = require("stream");

class TrackController {
    getTrack(req, res) {
        try {
            let trackID = new ObjectID(req.params.trackID);
        } catch (err) {
            return res.status(400).json({
                message: "Invalid trackid in URL paramater."
            })
        }

        res.set("content-type", "audio.mp3");
        res.set("accept-ranges", "bytes");

        let buckekt = new mongoose.mongo.GridFSBucket(_db, {
            bucketName: 'tracks'
        });

        let downloadStream = buckekt.openDownloadStream(trackID);

        downloadStream.on("data", (chunk) => {
            res.write(chunk);
        });

        downloadStream.on("error", () => {
            res.sendStatus(404);
        });

        downloadStream.on("end", () => {
            res.end();
        });
    }

    async setTrack(req, res) {
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

        await upload.single("track")(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    message: "Upload request Validation failed " + err
                });
            } else if (!req.body.name) {
                return res.status(400).json({
                    message: "No track name in request body"
                });
            }

            let trackName = req.body.name;

            //convert to buffer
            const readableTeackStream = new Readable();
        })
    }
}


module.exports = new TrackController();