import { defineStore } from "pinia"

const userStore = defineStore("userStore", {
    state: () => ({
        user: null,
        isLoggedIn: false,
        token: null
    }),

    actions: {
        login({ user, access_token }) {
            if (!access_token) return

            this.isLoggedIn = true
            this.user = user
            this.token = access_token
        },

        logout() {
            this.isLoggedIn = false
            this.user = null
            this.token = null
            localStorage.removeItem("userStore")
        },

        checkTokenValidity() {
            const stored = JSON.parse(localStorage.getItem("userStore"))
            if (stored && stored.token) {
                const tokenData = JSON.parse(atob(stored.token.split('.')[1]))
                const isExpired = tokenData.exp * 1000 < Date.now()
                if (isExpired) {
                    this.logout()
                } else {
                    this.login(stored)
                }
            }
        }
    },

    persist: {
        key: "userStore",
        storage: localStorage
    }
})

export default userStore
