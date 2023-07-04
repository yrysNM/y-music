import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'



export default defineConfig({
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js"
        }
    },
    preview: {
        port: 5005, // port for serve this remote  
    },
    plugins: [
        federation({

            name: "y-music-auth-upload", // name of remote to use on host side
            filename: "yMusicVueTracker.js",  // file name after the build
            exposes: {
                "./App": "./src/App.vue",   // target component you want to serve as remoite
            },
            shared: ["vue"]  // library
        })
    ],
    build: {
        minify: true,
    }
})