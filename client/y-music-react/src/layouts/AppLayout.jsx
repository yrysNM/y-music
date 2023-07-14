import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const AppLayout = () => {
    const vueAppRef = useRef(null);

    useEffect(() => {
        if (!vueAppRef.current) {
            import("y_music_remote/Button").then(vueApp => {
                const { createApp } = vueApp;
                const app = createApp();
                app.mount("#vue-app");
                vueAppRef.current = app;
            })
        }
    }, []);

    return (
        <main>
            <div id="vue-app"></div>
        </main>
    );
}