<template>
  <div>
    <h1>React in Vue</h1>
    <div class="app">
      <app-button />
    </div>
  </div>
</template>

<script>
// import SuspenseWithErrors from "./SuspenseWithErrors";
// import Layout from "./Layout.vue";
import AppButton from "./Button.vue";

export default {
  components: {
    // Layout,
    // SuspenseWithErrors,
    AppButton
  },
};
</script>

<style scoped>
.app {
  background-color: #000;
}
</style>
