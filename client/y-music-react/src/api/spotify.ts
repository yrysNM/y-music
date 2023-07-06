import { setItem } from "../helpers/persistanceStorage";
// import {axios} from "./axios";

interface IToken {
    access_token: string, 
    token_type: string, 
    expires_in: number
}

export const getSpotifyToken = async () => {
    const clientData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}`,
        client_secret:  `${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`,
    })
    
    /**
     * @TODO -> change fetch to axios
     */
    // return  await axios.post<IToken>("/api/token", clientData, {
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     }
    // }).then((res) => {
    //     setItem<string>("accessToken", res.data.access_token);
    // });

    return await fetch(`${import.meta.env.VITE_SPOTIFY_BASE_URL_ACCOUNT}api/token`, {
      method: 'POST',
      body: clientData
    }).then(res => res.json()).then((response: IToken) => {
        setItem<string>("accessToken",response.access_token);
    });
}