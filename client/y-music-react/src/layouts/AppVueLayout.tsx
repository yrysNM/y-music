import React, { useEffect, useState } from "react";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";


export const AppVueLayout: React.FC = () => {
    const [renderObj, setRenderObj] = useState({
        renderHTML: "",
        renderLoginFormHTML: "",
    });

    const fetchImport = async () => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/LoginForm")).default;

                // renderToString(res.render()).then(html => {
                //     console.log(html)
                // });
                const app = createSSRApp(res);
                resolve(renderToString(app));
            } catch (err) {
                reject(err);
            }
        })
    }

    useEffect(() => {
        fetchImport().then(resHtmlString => {
            setRenderObj({
                renderHTML: resHtmlString,
                renderLoginFormHTML: "",
            })
        });

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