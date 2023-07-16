import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

const AppLayout = () => {
    const vueAppRef = useRef(null);
    const [renderObj, setRenderObj] = useState({
        "type": "div",
        "key": null,
        "ref": null,
        "props": {
            "className": "w-full flex justify-center items-center",
            "children": {
                "type": "h1",
                "key": null,
                "ref": null,
                "props": {
                    "className": "font-bold text-2x1 text-white mt-2",
                    "children": "Something went wrong. Please try again."
                },
                "_owner": null
            }
        },
        "_owner": null
    });

    const fetchImport = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await import("y_music_remote/Button")).default;
                console.log(res);
                console.log(res.render());
                /**
                 * @TODO change vue render to react render obj just convert hahahaha
                 */
                // const renderObjVue = res.render();
                // const copyRenderObj = JSON.parse(JSON.stringify(renderObj));
                // copyRenderObj.type = renderObjVue.type; 
                // copyRenderObj.props = {

                // }
                // setRenderObj()
                resolve(ReactDOMServer.renderToStaticMarkup(res));
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
        fetchImport().then((res) => {
            console.log(res);
        })
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