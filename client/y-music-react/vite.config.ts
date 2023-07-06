import { defineConfig, preview } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from "@vitejs/plugin-react-refresh";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx, tsx, js, ts}',
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
    federation({
      name: "y-music-host-app",
      filename: "remoteEntry.js",
      exposes: {
        "./PreMain": "./src/Pre-main.tsx",
      },
      shared: [
        'react',
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-icons",
        "react-redux",
        "swiper",
        "url",
        "ym-api",
        "axios",
      ]
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
