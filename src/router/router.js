import {createRouter, createWebHistory} from 'vue-router';

import Inicio from "@/pages/Inicio.vue";
import {usuarioLogueado, usuarioNoLogueado} from "@/router/usuarioLogueado.js";

const routes = [
    {
        path: '/',
        component: Inicio,
        name: 'inicio'
    },
    {
        path: '/tareas/:id',
        component: () => import('@/pages/Tareas.vue'),
        name: "tareasUsuarioID",
        props: (route) => {
            const id = Number(route.params.id);
            return {id};
        }
    },
    {
        path: '/perfil/:id',
        component: () => import('@/pages/Perfil.vue'),
        name: "perfilID",
        props: (route) => {
            const id = Number(route.params.id);
            return {id};
        },
        beforeEnter: usuarioLogueado,
    },
    {
        path: '/tarea/:id',
        component: () => import('@/pages/Tarea.vue'),
        name: "tareaID",
        props: (route) => {
            const id = Number(route.params.id);
            return {id};
        }
    },
    {
        path: '/contacto',
        component: () => import('@/pages/Contacto.vue'),
        name: 'contacto'
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue'),
        name: 'login',
        beforeEnter: usuarioNoLogueado
    },
    {
        path: '/registro',
        component: () => import('@/pages/Registro.vue'),
        name: 'registro',
        beforeEnter: usuarioNoLogueado
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
