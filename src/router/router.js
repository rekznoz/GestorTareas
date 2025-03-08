
import {createRouter, createWebHistory} from 'vue-router';

import Nosotros from "@/pages/Inicio.vue";

const routes = [
    {
        path: '/',
        component: Nosotros,
        name: 'nosotros'
    },
    /*
    {
        path: '/:id',
        component: () => import('@/modules/pokemon/pages/Pokemon.vue'),
        name: "pokemonID",
        props: (route) => {
            const id = Number(route.params.id);
            return { id };
        }
    },
    {
        path: '/lista',
        component: () => import('@/modules/pokemon/pages/Lista.vue'),
        name: 'lista'
    },
    */
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