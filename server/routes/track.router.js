const Route = require("express");
const trackController = require("../controller/track.controller");

const router = new Route();

router.get("/:trackID", trackController.getTrack);

module.exports = router;