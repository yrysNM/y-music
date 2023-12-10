<template>
  <div>
    <h1 class="title-login">Login</h1>
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="this.signIn_show_alert"
      :class="this.signIn_show_alert"
    >
      {{ signIn_alert_msg }}
    </div>
    <!-- Login Form -->
    <form @submit.prevent="this.signIn" class="form">
      <div class="form-wrapper">
        <input
          id="email"
          type="email"
          name="email"
          class="input"
          :value="email"
        />
        <label class="label" for="email">Email</label>
      </div>

      <div class="form-wrapper">
        <input
          autocomplete="on"
          type="password"
          id="password"
          name="password"
          class="input"
        />
        <label class="label" for="password">Password</label>
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
      formData: {
        email: "",
        password: "",
      },
      email: "",
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
.title-login {
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.form {
  width: 400px;
  display: grid;
  place-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 8px;

  .form-wrapper {
    position: relative;
    margin-top: 50px;

    .label {
      position: absolute;
      top: 0;
      left: 5px;
      font-size: 18px;
      transition: all 0.2s ease-in-out;
      z-index: 1;
      color: #fff;
    }

    .input {
      position: relative;
      z-index: 2;
      background: transparent;
      padding: 2px 5px;
      border: 1px solid #999;
      border-radius: 8px;
    }

    .input:focus + .label {
      top: -18px;
      font-size: 14px;
    }
  }
}
.btn-submit {
  padding: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 32px;
  width: 100%;
  border-radius: 500px;
  background-color: #1c2a80;
  color: #e5e7eb;
  transition: color 0.4s ease, transform 0.1s ease;
  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
}
</style>
