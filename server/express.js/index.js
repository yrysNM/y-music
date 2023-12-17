require("dotenv").config({ path: "./.local.env" });
const express = require("express");
const cors = require("cors");
const trackClassRouter = require("./routes/track.router");
const lyricsClassRouter = require("./routes/lyrics.router");
const dbo = require("./db/db");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tracks", trackClassRouter);
app.use("/track", lyricsClassRouter);
dbo.main();

app.listen(PORT, () => {
  dbo.connectToServer((err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log(`Server started on ${PORT}`);
});
