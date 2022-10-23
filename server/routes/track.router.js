const Route = require("express");
const trackController = require("../controller/track.controller");

const router = new Route();

router.get("/files", trackController.getTrackFiles);
router.get("/filesJoin", trackController.getJoinTracksData);
router.get("/:trackID", trackController.getTrackID);
router.post("/", trackController.setTrack);

module.exports = router;