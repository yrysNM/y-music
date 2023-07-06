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
      remotes: {
        y_music_remote: "http://localhost:5000/assets/remoteEntry.js", //remote path containing the port configured on remote side, the build path, and the filename also configured on the remote side
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
