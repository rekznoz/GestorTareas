<script>
import userStore from "@/stores/userStore.js";
import router from "@/router/router.js";

export default {
  name: "Header",
  methods: {
    userStore,

    /**
     * Método para cerrar sesión
     */
    clickLogout() {
      userStore().logout();
      router.push("/");
    },
  },
}
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Inicio</router-link>
          <router-link to="/contacto" class="nav-link">Contacto</router-link>
          <router-link v-if="userStore().isLoggedIn" :to="`/tareas/${userStore().user.id}`" class="nav-link">Tareas</router-link>
          <router-link v-if="userStore().isLoggedIn" :to="`/perfil/${userStore().user.id}`" class="nav-link">Perfil</router-link>
          <button v-if="userStore().isLoggedIn" @click="clickLogout" class="nav-link">Logout</button>
          <router-link v-else to="/login" class="nav-link">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(90deg, var(--color-fondo-principal), var(--color-fondo-secundario));
  padding: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

/* Enlaces de navegación */
.nav-link {
  text-decoration: none;
  color: var(--color-texto-principal);
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 3px;
  background: var(--color-resaltado-oscuro);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--color-resaltado-oscuro);
}

button {
  background: none;
  border: none;
  color: var(--color-texto-principal);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-list {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

</style>