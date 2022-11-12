const lyricsFinder = require("lyrics-finder");

class Lyrics {
    async getLyrics(req, res) {
        const artistName = req.body.artistName;
        const title = req.body.trackName;

        let lyrics = await lyricsFinder(artistName, title) || "Not found";

        res.send(lyrics);
    }
}

module.exports = new Lyrics();