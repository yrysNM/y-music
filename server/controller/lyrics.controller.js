const _db = require("../db/db");
const ObjectID = require("mongodb").ObjectId;
const lyricsFinder = require("lyrics-finder");

class Lyrics {
    async getLyrics(req, res) {
        const collection = _db.getDb().collection('tracks');
        const track = await collection.findOne({
            trackId: new ObjectID(req.params.trackID)
        });

        let lyrics = await lyricsFinder(track.artistName, track.title) || "Not found";

        res.json(lyrics);
    }
}

module.exports = new Lyrics();