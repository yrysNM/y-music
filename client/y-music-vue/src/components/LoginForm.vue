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
    <form @submit="this.signIn" class="form">
      <div class="form-wrapper">
        <label class="label" for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          class="input"
          placeholder="Enter email"
        />
      </div>

      <div class="form-wrapper">
        <label class="label" for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          class="input"
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
.form {
  width: 400px;
  display: grid;
  place-content: center;

  .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
      color: #fff;
      font-size: 14px;
    }

    .input {
      border: none;
      outline: none;
      border-radius: 8px;
      width: 100%;
      background-color: #fff;
    }
  }
}
.btn-submit {
  padding: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
