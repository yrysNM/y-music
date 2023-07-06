import { defineConfig, preview } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from "@vitejs/plugin-react-refresh";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react({
    //   include: '**/*.{jsx, tsx, js, ts}',
    //   babel: {
    //     plugins: ['babel-plugin-styled-components'],
    //   },
    // }),
    reactRefresh(),
    federation({
      name: "y-music-host-app",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      }
    })
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      querystring: 'querystring-browser',
    },
  },
});
