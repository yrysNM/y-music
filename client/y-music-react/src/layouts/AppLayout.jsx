import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { h } from "vue";
import { renderToString } from "vue/server-renderer";

const AppLayout = () => {
    const vueAppRef = useRef(null);
    const [renderObj, setRenderObj] = useState({
        renderHtml: "",
    });

    const fetchImport = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/LoginForm")).default;

                resolve(renderToString(h(res)));
            } catch (err) {
                reject(err);
            }
        })
    }

    useEffect(() => {

        fetchImport().then(resHtmlString => {
            setRenderObj({
                renderHtml: resHtmlString
            });
        });
    }, []);



    return (
        <main>
            <div id="vue-app" ref={vueAppRef} dangerouslySetInnerHTML={{ __html: renderObj.renderHtml }}></div>
        </main>
    );
}

export default AppLayout;