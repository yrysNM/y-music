import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
      name: "y-music",
      filename: "remoteEntry.js",
      exposes: {
        "./MyButton": "./src/MyButton.vue",
      },
      remotes: {
        some: "remote_some"
      }
    })
  ],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      querystring: 'querystring-browser',
    },
  },
});
