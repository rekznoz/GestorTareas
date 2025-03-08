
import {createRouter, createWebHistory} from 'vue-router';

import Nosotros from "@/pages/Inicio.vue";

const routes = [
    {
        path: '/',
        component: Nosotros,
        name: 'nosotros'
    },
    {
        path: '/tareas/:id',
        component: () => import('@/pages/Tareas.vue'),
        name: "tareas",
        props: (route) => {
            const id = Number(route.params.id);
            return { id };
        }
    },
    /*
    {
        path: '/lista',
        component: () => import('@/modules/pokemon/pages/Lista.vue'),
        name: 'lista'
    },
    */
    {
        path: '/contacto',
        component: () => import('@/pages/Contacto.vue'),
        name: 'contacto'
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue'),
        name: 'login'
    },
    {
        path: '/registro',
        component: () => import('@/pages/Registro.vue'),
        name: 'registro'
    },
    {
        path: '/:pathMatch(.*)*', // 404 Not Found
        component: () => import('@/pages/Error.vue'),
        name: 'Error',
        //redirect: { name: 'error' }
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router;