import {defineStore} from "pinia"

const usuarioVacio = {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
}

/**
 * Almacena el usuario logueado y su token de acceso
 * @type {StoreDefinition<"userStore", {user: {id: number, name: string, email: string, email_verified_at: string, created_at: string, updated_at: string}, isLoggedIn: boolean, access_token: null}, {}, {login({user: *, access_token: *}): void, logout(): void, checkTokenValidity(): void}>}
 */
const userStore = defineStore("userStore", {

    state: () => ({
        user: usuarioVacio,
        isLoggedIn: false,
        access_token: null
    }),

    actions: {

        /**
         * Loguea al usuario
         * @param user
         * @param access_token
         */
        login({user, access_token}) {
            if (!access_token) return

            this.isLoggedIn = true
            this.user = user
            this.access_token = access_token
            localStorage.setItem("userStore", JSON.stringify({user, access_token}))
        },

        /**
         * Cierra la sesión de un usuario autentic
         */
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

        /**
         * Valida el token del usuario si esta caducado o no
         */
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
