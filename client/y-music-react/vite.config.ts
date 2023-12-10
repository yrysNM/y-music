import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


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
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
});
