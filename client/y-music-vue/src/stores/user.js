import { defineStore } from "pinia";
import { auth, userCollection } from "../includes/firebase";

export default defineStore("user", {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        async register(values) {
            const { user } = await auth.createUserWithEmailAndPassword(values.email, values.password);

            await userCollection.doc(user.uid).set({
                name: values.name,
                email: values.email,
                age: values.age,
                genre: values.genre,
                country: values.country,
            });

            await user.updateProfile({
                displayName: values.name,
            });

            this.isLoggedIn = true;
        },
        async login(values) {
            await auth.signInWithEmailAndPassword(values.email, values.password);

            this.isLoggedIn = true;
        },
        async singOut() {
            await auth.signOut();

            this.isLoggedIn = false;
        }
    }
})