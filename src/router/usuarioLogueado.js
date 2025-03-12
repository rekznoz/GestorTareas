import userStore from "@/stores/userStore.js";

export const usuarioLogueado = (to, from, next) => {
    if (userStore().isLoggedIn) {
        next();
    } else {
        next('/login');
    }
};

export const usuarioNoLogueado = (to, from, next) => {
    if (!userStore().isLoggedIn) {
        next();
    } else {
        next('/');
    }
}