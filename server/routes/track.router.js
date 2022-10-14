const Route = require("express");
const trackController = require("../controller/track.controller");

const router = new Route();

router.get("/all", trackController.getAllTrack);
router.get("/:trackID", trackController.getTrackID);
router.post("/", trackController.setTrack);

module.exports = router;