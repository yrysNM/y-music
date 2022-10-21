// import { YMApi } from "ym-api";
import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import tracks from "./components/data/tracks";


const PageMusic = () => {
    // const api = new YMApi();
    const [musicData, setMusicData] = useState([]);
    async function getData() {
        const obj = {
            data: "",
        };
        const res = await axios.get("http://localhost:4000/tracks/all");
        obj.data = res.data;
        // const objValue = Object.values(obj.data); 
        // const objKey = Object.keys(obj.data);
        let trackData = {};

        res.data.forEach(async (val, i) => {
            await axios.get(`http://localhost:4000/tracks/${val._id}`)
                .then(trackBase64 => {
                    trackData = { val, [val['length']]: trackBase64.data }
                    // obj.data = [...obj.data, obj.data[i]['trackBase64']: trackBase64.data];
                    console.log(trackData);
                });
        });


        // return obj.data;
        return trackData;
    }
    useEffect(() => {
        getData().then(res => console.log(res));
        // axios.get("http://localhost:4000/tracks/6333e8c12e109f0d744eaa91")
        //     .then(res => );
        /**
         * @TODO username and  password wrong and code 403 FROBBIN
         */
        // (async () => {
        //     try {
        //         await api.init({
        //             username: "6328d8137c954a6aaa3863260eaeefe9",
        //             password: "8d8b050b9320450d9da155753f58cedc"
        //         });
        //         const result = await api.searchArtists("gorillaz");
        //         console.log({ result });
        //     } catch (e) {
        //         console.log(`api error ${e.message}`);
        //     }
        // })();

    })

    return (
        <div>
            <AudioPlayer tracks={tracks} />
            <AudioLists />
        </div>
    );
}

export default PageMusic;