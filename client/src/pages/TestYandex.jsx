// import axios from 'axios';
// import { useEffect } from 'react';
// import { YMApi } from 'ym-api';
// import { useSelector } from 'react-redux';

// const TestYandexPage = () => {
//   // const [data, setData] = useState([]);
//   const { songIndex } = useSelector(state => state.songs);

//   useEffect(() => {
//     // axios.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=4f2f703708f16aaa796435d052ed3d51&format=json")
//     //     .then(res => console.log(res.data));

//     const api = new YMApi();

//     (async () => {
//       try {
//         await api.init({
//           username: 'loxmotov.arcen',
//           password: 'J!6tV!FEyms!fHz',
//         });
//         const result = await api.getTrack('34653336');
//         const feed = await api.getFeed();
//         console.log({ result });
//         console.log(feed);
//       } catch (e) {
//         console.log(`api error ${e.message}`);
//       }
//     })();
//   }, []);

//   return <div className="playlist">test</div>;
// };

// export default TestYandexPage;
