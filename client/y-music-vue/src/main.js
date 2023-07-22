import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import VeeValidatedPlugin from "@/includes/validation";
import { auth } from "./includes/firebase";


import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

let app;

auth.onAuthStateChanged(() => {
    if (!app) {

        app = createApp(App);
        app.use(createPinia());
        app.use(VeeValidatedPlugin, { foo: 100 });

        app.mount("#app");
    }
});

export default { app };