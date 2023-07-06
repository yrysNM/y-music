<template>
  <div class="layout-app">
    <div class="app-label">
      <h1>home App vue based</h1>
      # Hosting App [vue based]
    </div>
    <h1>Layout App react based</h1>
    <div class="remote-component">
      <div class="app-label">#remote-component [REMOTE]</div>
    </div>
    <div v-html="button"></div>
  </div>
</template>

<script>
import ReactDOMServer from "react-dom/server";
export default {
  data() {
    return {
      dataV: {
        value: null,
      },
    };
  },
  mounted() {
    if (this.fetchImport()) {
      this.fetchImport().then((res) => {
        console.log(res);
        this.dataV.value = res;
      });
    }
  },
  computed: {
    button() {
      return this.dataV.value;
    },
  },
  methods: {
    async fetchImport() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = (await import("y_music_remote/PreMain")).default;
          resolve(ReactDOMServer.renderToString(res()));
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};
</script>
