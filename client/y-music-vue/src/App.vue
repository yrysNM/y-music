<template>
  <div>
    <h1>React in Vue</h1>
    <div class="app">
      <SuspenseWithErrors>
        <template #error="props">
          <p class="center error space-up">
            {{ props.error }}
          </p>
        </template>
        <template #default>
          <Layout />
        </template>
        <template #fallback>
          <div class="space-up">Loading please wait ...</div>
        </template>
      </SuspenseWithErrors>
    </div>
  </div>
</template>

<script>
import SuspenseWithErrors from "./SuspenseWithErrors";
import Layout from "./Layout.vue";
export default {
  components: {
    Layout,
    SuspenseWithErrors,
  },
};
</script>

<style lang="scss" scoped></style>
