import React, { useEffect, useState } from "react";
import { h } from "vue";
import { renderToString } from "vue/server-renderer";

export const AppVueLayout: React.FC = () => {
    const [renderObj, setRenderObj] = useState({
        renderHTML: ""
    });

    const fetchImport = async () => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/LoginForm")).default;
                // const app = createApp(res);
                // console.log(app);
                // console.log(h(app));
                resolve(renderToString(h(res)));
            } catch (err) {
                reject(err);
            }
        })
    }

    useEffect(() => {
        fetchImport().then(resHtmlString => {
            setRenderObj({
                renderHTML: resHtmlString,
            })
        })
    }, []);

    return (
        <main>
            <div dangerouslySetInnerHTML={{ __html: renderObj.renderHTML }}></div>
        </main>
    );
}