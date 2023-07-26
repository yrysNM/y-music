import React, { useEffect, useState } from "react";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";


export const AppVueLayout: React.FC = () => {
    const [renderObj, setRenderObj] = useState({
        renderHTML: "",
        renderLoginFormHTML: "",
    });

    const fetchImport = async () => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/Main")).default;

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


    /**
     * @TODO make common function for load components from vue
     */
    const fetchVueComponent = async (nameComponent: string) => {
        const hostUrl: string = `y_music_remote/${nameComponent}`;
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = (await import(hostUrl)).default;

                resolve(renderToString(h(res.render())));
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


        fetchVueComponent("LoginForm").then(res => {
            console.log(res);
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