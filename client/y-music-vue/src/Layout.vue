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
    <div v-html="htmlLayoutForMainComponent"></div>
  </div>
</template>

<script>
import ReactDOMServer from "react-dom/server";
export default {
  data() {
    return {
      dataV: {
        errorComponent: null,
        mainComponent: null,
      },
    };
  },
  mounted() {
    this.fetchImportReactComponents().then((res) => {
      this.dataV.mainComponent = res;
    });

    /**
     * @TODO make dynamic function for load react components,
     * ,+++++++++++++++++++++++++++++++++++++++++++++++
     */
    // this.fetchImportReactComponents("PreMain").then((res) => {
    //   this.dataV.mainComponent = res;
    // });
  },
  computed: {
    htmlLayoutForErrorComponent() {
      return this.dataV.errorComponent;
    },
    htmlLayoutForMainComponent() {
      return this.dataV.mainComponent;
    },
  },
  methods: {
    async fetchImportReactComponents(nameComponent) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = (await import("y_music_remote/Error")).default;
          resolve(ReactDOMServer.renderToString(res()));
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};
</script>
