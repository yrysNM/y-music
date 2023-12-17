const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectId;
const multer = require("multer");
const jsmediatags = require("jsmediatags");
const _db = require("../db/db");
const { Readable } = require("stream");

class TrackController {
  getTrackID(req, res) {
    try {
      var trackID = new ObjectID(req.params.trackID);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid trackid in URL paramater.",
      });
    }
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    let buckekt = new mongoose.mongo.GridFSBucket(_db.getDb(), {
      bucketName: "tracks",
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

  async getJoinTracksData(req, res) {
    const collection = _db.getDb().collection("tracks");

    //error in left side
    const dataTracks = await collection.aggregate([
      {
        $lookup: {
          from: "tracks.files",
          localField: "trackId",
          foreignField: "_id",
          as: "tracks.data",
          left: {
            file_id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$files_id", "$$file_id"],
                },
              },
            },
            {
              $limit: 1,
            },
          ],
        },
      },
    ]);

    const updateTracksData = await dataTracks.toArray();

    res.send(JSON.stringify(updateTracksData));
  }

  async getTrackFiles(req, res) {
    const collection = _db.getDb().collection("tracks.files");
    const allTracks = await collection.find().toArray();

    res.send(allTracks);
  }

  async getTrackData(req, res) {
    const collection = _db.getDb().collection("tracks");

    const track = await collection.findOne({
      trackId: new ObjectID(req.params.trackID),
    });

    if (track) {
      res.send(track);
    } else {
      res.sendStatus(404);
    }
  }

  async getTracksData(req, res) {
    const collection = _db.getDb().collection("tracks");
    const allData = await collection.find().toArray();

    res.send(allData);
  }

  async setTrack(req, res) {
    const storage = multer.memoryStorage();

    const upload = multer({
      storage: storage,
      limits: {
        fields: 3,
        fileSize: 52428800,
        files: 1,
        parts: 5,
      },
    });
    const collection = _db.getDb().collection("tracks");

    await upload.single("track")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Upload request Validation failed " + err,
        });
      } else if (!req.body.name) {
        return res.status(400).json({
          message: "No track name in request body",
        });
      }

      let trackName = req.body.name;

      //convert to buffer
      const readableTeackStream = new Readable();
      readableTeackStream.push(req.file.buffer);
      readableTeackStream.push(null);

      let bucket = new mongoose.mongo.GridFSBucket(_db.getDb(), {
        bucketName: "tracks",
      });

      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTeackStream.pipe(uploadStream);

      //parse track data
      jsmediatags.read(req.file.buffer, {
        onSuccess: function (tag) {
          const { tags } = tag;
          console.log(tag);
          collection.insertOne({
            trackId: id,
            title: tags.title,
            artistName: tags.artist,
            album: tags.album,
            year: tags.year,
            genre: tags.genre,
            picture: tags.picture,
          });
        },
        onError: function (error) {
          console.log(":(", error.type, error.info);
        },
      });

      uploadStream.on("finish", () => {
        return res.status(201).json({
          message:
            "File  upload succesfully, stored under Mongo ObjectId: " + id,
        });
      });
    });
  }
}

module.exports = new TrackController();
