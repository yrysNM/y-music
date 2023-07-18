<template>
    <div>
        <div class="text-white text-center font-bold p-4 mb-4" v-if="signIn_show_alert" :class="signIn_show_alert">
            {{ signIn_slert_msg }}
        </div>
        <!-- Login Form -->
        LoginTEst
    </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
    name: "LoginForm",
    data() {
        return {
            signIn_submission: false,
            signIn_show_alert: true,
            signIn_alert_variant: "bg-blue-500",
            signIn_slert_msg: "Please wait! We are logging you in."
        }
    },
    methods: {
        ...mapActions(useUserStore, ['login']),
        async signIn(values) {

        }
    }
}
</script>

<style lang="scss" scoped></style>