import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from "@vitejs/plugin-react-refresh";
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
/**
 * @BEFORE source for pnpm
 * @TODO pnpm build and pnpm serve 
 */
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
      remotes: {
        "y_music_remote": "http://localhost:5000/dist/assets/remoteEntry.js",
      },
      exposes: {
        "./PreMain": "./src/Pre-main.tsx",
        "./Error": "./src/components/Error.tsx",
      }
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      // sharedPlugin need input required
      // input:{},
      output: {
        minifyInternalExports: false
      }
    }
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      querystring: 'querystring-browser',
    },
  },
});
