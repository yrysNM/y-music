import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  plugins: [
    vue(),
    federation({
      name: "y-music-remote-app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.vue",
      }
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

 