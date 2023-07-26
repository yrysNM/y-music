<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="this.signIn_show_alert"
      :class="this.signIn_show_alert"
    >
      {{ signIn_alert_msg }}
    </div>
    <!-- Login Form -->
    <form @submit="this.signIn">
      <!-- EMAIL -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input
          type="email"
          name="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter email"
        />
      </div>
      <button :disabled="this.signIn_submission" class="btn btn-submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default defineComponent({
  name: "LoginForm",

  data() {
    return {
      signIn_submission: false,
      signIn_show_alert: false,
      signIn_alert_variant: "bg-blue-500",
      signIn_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["login"]),
    async signIn(values) {
      this.signIn_submission = true;
      this.signIn_show_alert = true;
      (this.signIn_alert_variant = "bg-blue-500"),
        (this.signIn_alert_message = "Please wait! We are logging you in.");

      try {
        await this.login(values);
      } catch (error) {
        this.signIn_submission = false;
        this.signIn_alert_msg = "Something went wrong or invalid login details";
        this.signIn_alert_variant = "bg-red-500";
        return;
      }

      this.signIn_alert_variant = "bg-green-500";
      this.signIn_alert_message = "Success! You are now logged in.";
      window.location.reload();
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-submit {
  padding: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
