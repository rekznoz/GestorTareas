import {defineStore} from "pinia";

const userStore = defineStore('userStore', {
        state: () => ({
            user: {
                name: null,
            },
            isLoggedIn: false
        }),

        actions: {
            login() {
                this.isLoggedIn = true
            },
            logout() {
                this.isLoggedIn = false
            },
            setUser(user) {
                this.user = user
            }
        },

        persist: [
            {
                key: 'userStore',
                storage: localStorage
            }
        ]

    }
)

export default userStore;