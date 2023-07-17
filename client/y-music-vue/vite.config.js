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
      name: "y-music-remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.vue",
      },
      remotes: {
        "y_music_remote": "http://localhost:5001/dist/assets/remoteEntry.js",
      },
      shared: ["vue"],

    }),
  ],
  build: {
    target: ["chrome89", "edge89", "firefox89", "safari15"],
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  },
});

