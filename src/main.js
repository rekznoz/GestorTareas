import './css/import.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router.js";
import {createPinia} from "pinia";
import userStore from "@/stores/userStore.js";

const pinia = createPinia()
const store = userStore(pinia);
store.checkTokenValidity();

createApp(App).use(router).use(pinia).mount('#app')