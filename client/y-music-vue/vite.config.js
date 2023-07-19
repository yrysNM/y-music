import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  plugins: [
    vue(),
    federation({
      name: "y-music-remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.vue",
        "./LoginForm": "./src/components/LoginForm.vue",
        "./App": "./src/App.vue",
        "./Main": "./src/main.js",
      },
      remotes: {
        "y_music_remote": "http://localhost:5001/dist/assets/remoteEntry.js",
      },
      shared: ["vue", "@vee-validate/rules", "vee-validate"],

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
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  }
});

