import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

const AppLayout = () => {
    const vueAppRef = useRef(null);

    const fetchImport = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/y-music-remote-button")).default;
                console.log(res);
                resolve(ReactDOMServer.renderToString(res()));
            } catch (err) {
                reject(err);
            }
        })
    }

    useEffect(() => {
        // if (!vueAppRef.current) {
        //     import("y_music_remote/Button").then(vueApp => {
        //         const { createApp } = vueApp;
        //         const app = createApp();
        //         app.mount("#vue-app");
        //         vueAppRef.current = app;
        //     })
        // }
        // // const vueApp = createApp(Button).mount(vueAppRef.current);

        // return () => {
        //     vueApp.unmount();
        // }

        // if (fetchImport()) {
        //     fetchImport().then((res) => {
        //         console.log(res);
        //     })
        // }
        fetchImport();
    }, []);



    return (
        <main>
            <div id="vue-app" ref={vueAppRef}></div>
        </main>
    );
}

export default AppLayout;