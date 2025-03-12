import {defineStore} from "pinia"
import {actualizarToken, logoutAuth} from "@/helper/getUsuarioAuth.js";

const usuarioVacio = {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
}

const userStore = defineStore("userStore", {

    state: () => ({
        user: usuarioVacio,
        isLoggedIn: false,
        access_token: null
    }),

    actions: {
        login({user, access_token}) {
            if (!access_token) return

            this.isLoggedIn = true
            this.user = user
            this.access_token = access_token
            localStorage.setItem("userStore", JSON.stringify({user, access_token}))
        },

        logout() {
            //logoutAuth().then(
            //    () => {
                    this.isLoggedIn = false
                    this.user = usuarioVacio
                    this.access_token = null
                    localStorage.removeItem("userStore")
           //     }
           // ).catch(
           //     (error) => {
            //        console.error("Logout failed: ", error)
            //    }
           // )
        },

        checkTokenValidity() {
            const stored = JSON.parse(localStorage.getItem("userStore"))
            if (stored && stored.access_token) {
                const tokenData = JSON.parse(atob(stored.access_token.split('.')[1]))
                const isExpired = tokenData.exp * 1000 < Date.now()
                if (isExpired) {
                    this.logout()
                    //console.log("Expired token: ", tokenData)
                } else {
                    this.login(stored)
                    //console.log(stored)
                }
            }
        }
    },

    persist: {
        enabled: true,
        key: "userStore",
        storage: localStorage
    }
})

export default userStore
