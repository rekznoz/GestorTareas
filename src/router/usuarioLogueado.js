import userStore from "@/stores/userStore.js";

/**
 * Verifica si el usuario está logueado
 * @param to
 * @param from
 * @param next
 */
export const usuarioLogueado = (to, from, next) => {
    if (userStore().isLoggedIn) {
        next();
    } else {
        next('/login');
    }
};

/**
 * Verifica si el usuario no está logueado
 * @param to
 * @param from
 * @param next
 */
export const usuarioNoLogueado = (to, from, next) => {
    if (!userStore().isLoggedIn) {
        next();
    } else {
        next('/');
    }
}