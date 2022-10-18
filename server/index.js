require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const trackClassRouter = require("./routes/track.router");
const dbo = require("./db/db");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tracks", trackClassRouter);

dbo.main();

app.listen(PORT, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`Server started on ${PORT}`);
})