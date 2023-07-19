<template>
    <div>
        <div class="text-white text-center font-bold p-4 mb-4" v-if="signIn_show_alert" :class="signIn_show_alert">
            {{ signIn_alert_msg }}
        </div>
        <!-- Login Form -->
        <vee-form :validation-schema="loginSchema" @submit="signIn">
            <!-- EMAIL -->
            <div class="mb-3">
                <label class="inline-block mb-2">Email</label>
                <vee-field type="email" name="email"
                    class="block w-full py-1.5  px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter email" />

                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <button :disabled="signIn_submission">SUBMIT</button>
        </vee-form>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
    name: "LoginForm",
    data() {
        return {
            loginSchema: {
                email: "required|email",
                password: "required|min:9|max:100",
            },
            signIn_submission: false,
            signIn_show_alert: false,
            signIn_alert_variant: "bg-blue-500",
            signIn_alert_msg: "Please wait! We are logging you in."
        }
    },
    methods: {
        ...mapActions(useUserStore, ['login']),
        async signIn(values) {
            this.signIn_submission = true;
            this.signIn_show_alert = true;
            this.signIn_alert_variant = "bg-blue-500",
                this.signIn_alert_message = "Please wait! We are logging you in.";

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
        }
    }
}
</script>

<style lang="scss" scoped></style>