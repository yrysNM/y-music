import React, { useEffect, useState } from "react";
import { h, createSSRApp, defineAsyncComponent } from "vue";
import { renderToString } from "vue/server-renderer";


const remoteApp = defineAsyncComponent(() => import("y_music_remote/LoginForm"));

export const AppVueLayout: React.FC = () => {
    const [renderObj, setRenderObj] = useState({
        renderHTML: ""
    });

    const fetchImport = async () => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/Main")).default;
                console.log(h(remoteApp))
                // console.log(res.render());
                const app = createSSRApp(remoteApp);
                renderToString(h(remoteApp)).then(html => {
                    console.log(html)
                });

                console.log(app);
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
            {
                renderObj.renderHTML &&
                (<div dangerouslySetInnerHTML={{ __html: renderObj.renderHTML }}></div>)
            }
        </main>
    );
}