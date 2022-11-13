const Router = require("express");
const lyricsController = require("../controller/lyrics.controller");

const router = new Router();
router.get("/lyrics/:trackID", lyricsController.getLyrics);


module.exports = router;