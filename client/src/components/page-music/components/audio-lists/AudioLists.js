import { useState, useEffect } from "react";
import axios from "axios";
import data from "../data/tracks";

const AudioLists = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/tracks/all")
            .then(res => setTracks(res.data));
    }, []);


    return (
        <div style={{ textAlign: "center", margin: "100px 200px" }}>
            <table>
                <thead>

                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(tracks => (
                        <tr key={tracks.title}>
                            <td>
                                <img
                                    src={tracks.image}
                                    alt="track img"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "100%",
                                    }} />
                            </td>
                            <td>
                                {tracks.title}
                            </td>
                            <td>
                                {tracks.artist}
                            </td>
                        </tr>
                    ))}

                    {tracks.map(value => {
                        return (
                            <tr key={value._id}>
                                <td>
                                    <img
                                        src="https://media.tenor.com/qbHav4TRIp0AAAAM/anime-music.gif"
                                        alt="track default img"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "100%",
                                        }} />
                                </td>
                                <td>
                                    {value.filename}
                                </td>
                                <td>
                                    {value.artist ? value.artist : "none"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AudioLists;