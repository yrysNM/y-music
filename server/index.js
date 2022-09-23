const express = require("express");
const cors = require("cors");
const needle = require("needle");

const URL = "https://music.yandex.kz/users/loxmotov.arcen/playlists/101";
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {


    needle.get(URL, (err, data) => {
        if (err) throw err;
        res.send(data.body);
        console.log(data.statusCode);
    })

    // res.send("OK");
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
