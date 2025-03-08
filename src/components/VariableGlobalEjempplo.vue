<script>
import {mapState, storeToRefs} from "pinia";
import useContadorStore from "@/stores/contadorStore.js";
import userStore from "@/stores/userStore.js";

//const contadorStore = useContadorStore();
//const { contador, contadorDoble } = storeToRefs(contadorStore);

export default {
  name: "contador",
  data() {
    return {
      usuario: "",
    };
  },
  computed: {
    ...mapState(useContadorStore, ["contador", "estaCargando", "contadorDoble"]),
    ...mapState(userStore, ["user", "isLoggedIn"]),
  },
  methods: {
    incrementar() {
      useContadorStore().incrementar();
    },
    decrementar() {
      useContadorStore().decrementar();
    },
    numeroRamdom() {
      useContadorStore().numeroRandom();
    },
    login() {
      const usuario = {id: 1, user: "Rafa"};
      userStore().setUser(usuario);
      userStore().login();
    },
    logout() {
      userStore().logout();
    },
  },

}
</script>

<template>
  <div>
    <h1>Contador</h1>
    <p>{{ contador }}</p>
    <p>{{ contadorDoble }}</p>
  </div>
  <button @click="incrementar">Incrementar</button>
  <button @click="decrementar">Decrementar</button>
  <button @click="numeroRamdom" :disabled="estaCargando">Numero Random</button>
  <button @click="login" v-if="!isLoggedIn">Login</button>
  <button @click="logout" v-if="isLoggedIn">Logout</button>
  <p v-if="isLoggedIn">Usuario: {{ user.user }}</p>
</template>

<style scoped>

</style>