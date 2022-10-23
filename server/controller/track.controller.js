const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectId;
const multer = require("multer");
const _db = require("../db/db");
const { Readable } = require("stream");

class TrackController {
    getTrackID(req, res) {
        try {
            var trackID = new ObjectID(req.params.trackID);
        } catch (err) {
            return res.status(400).json({
                message: "Invalid trackid in URL paramater."
            })
        }
        res.set("content-type", "audio/mp3");
        res.set("accept-ranges", "bytes");


        let buckekt = new mongoose.mongo.GridFSBucket(_db.getDb(), {
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

    async getAllTrack(req, res) {
        const collection = _db.getDb().collection("tracks.files");
        const tracksData = await collection.aggregate([
            {
                $lookup: {
                    from: "tracks.chunks",
                    localField: "_id",
                    foreignField: "files_id",
                    as: "tracksData"
                }
            },
            {
                $unwind: "$tracksData"
            },
            {
                $group: {
                    _id: {
                        id: "$_id",
                        files_id: "$files_id",
                        data: "$data",
                    }
                    // "_id": {
                    //     "$first": "$tracksData"
                    // }
                }
            }
        ]);

        const updateTracksData = await tracksData.toArray();

        // for await (const doc of tracksData) {
        //     console.log(doc);
        // }

        // const allTracks = await collection.find().toArray();

        res.send(JSON.stringify(updateTracksData));
    }

    async setTrack(req, res) {
        const storage = multer.memoryStorage();
        const upload = multer({
            storage: storage,
            limits: {
                fields: 3,
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
            } else if (!req.body.artistName) {
                return res.status(400).json({
                    message: "No artist name in request body"
                });
            }

            let trackName = req.body.name;

            //convert to buffer
            const readableTeackStream = new Readable();
            readableTeackStream.push(req.file.buffer);
            readableTeackStream.push(null);

            let bucket = new mongoose.mongo.GridFSBucket(_db.getDb(), {
                bucketName: "tracks"
            });

            let uploadStream = bucket.openUploadStream(trackName);
            let id = uploadStream.id;
            readableTeackStream.pipe(uploadStream);

            uploadStream.on("finish", () => {
                return res.status(201).json({
                    message: "File  upload succesfully, stored under Mongo ObjectId: " + id
                });
            });
        });
    }
}


module.exports = new TrackController();