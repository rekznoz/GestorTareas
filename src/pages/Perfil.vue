<script>
import userStore from "@/stores/userStore.js";
import configStore from "@/stores/configStore.js";

export default {
  name: "Perfil",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {

    /**
     * Método para obtener el usuario actual
     * @returns {Object}
     */
    user() {
      return userStore().user;
    },

    /**
     * Método para obtener el modo oscuro
     * @returns {boolean}
     */
    darkMode() {
      return configStore().darkMode;
    },

    /**
     * Método para obtener el modo drag and drop
     * @returns {boolean}
     */
    dragAndDrop() {
      return configStore().dragAndDrop;
    },
  },
  methods: {

    /**
     * Método para activar o desactivar el modo oscuro
     * @param {boolean} value
     */
    toggleDarkMode(value) {
      configStore().setDarkMode(value);
    },

    /**
     * Método para activar o desactivar el modo drag and drop
     * @param {boolean} value
     */
    toggleDragDrop(value) {
      configStore().setDragAndDrop(value);
    },
  },
};
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="title">{{ user.name }}</h1>
      <p class="subtitle">{{ user.email }}</p>

      <div class="mode-switcher">
        <label for="drag-drop-toggle">Activar modo drag and drop en Tareas</label>
        <input
            type="checkbox"
            id="drag-drop-toggle"
            @change="toggleDragDrop($event.target.checked)"
            :checked="dragAndDrop"
        >
      </div>

      <div class="mode-switcher">
        <label for="dark-mode-toggle">Activar modo oscuro</label>
        <input
            type="checkbox"
            id="dark-mode-toggle"
            @change="toggleDarkMode($event.target.checked)"
            :checked="darkMode"
        >
      </div>

    </div>
  </div>
</template>


<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-fondo-cuaternario);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--color-texto-principal);
}

.subtitle {
  font-size: 1rem;
  color: var(--color-texto-principal);
}

.mode-switcher {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mode-switcher label {
  margin-right: 10px;
  font-size: 1rem;
  color: var(--color-texto-principal);
}

.mode-switcher input {
  width: 20px;
  height: 20px;
}
</style>