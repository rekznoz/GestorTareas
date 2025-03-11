import './css/import.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router.js";
import {createPinia} from "pinia";
import userStore from "@/stores/userStore.js";
import configStore from "@/stores/configStore.js";

const pinia = createPinia()
const userstore = userStore(pinia);
const confistore = configStore(pinia);
userstore.checkTokenValidity();
confistore.loadData();

createApp(App).use(router).use(pinia).mount('#app')