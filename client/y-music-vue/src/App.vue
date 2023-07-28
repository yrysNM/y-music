<template>
  <div class="app">
    <login-form />
  </div>
</template>

<script>
/**
 * @TODO add warning errors
 */
// import SuspenseWithErrors from "./SuspenseWithErrors";
// import Layout from "./layouts/Layout.vue";
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
};
</script>

<style scoped></style>
