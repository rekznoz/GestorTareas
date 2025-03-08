<script>
import {getTareasUsuario} from "@/helper/getTareasUsuario.js";

export default {
  name: "Tareas",

  data() {
    return {
      tareas: [],
      tareaArrastrada: null, // Tarea que se está arrastrando
    };
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  methods: {

    completarTarea(id) {
      console.log(id)
    },

    async cargarTareas() {
      try {
        this.tareas = await getTareasUsuario(this.id);
      } catch (error) {
        console.error(error);
      }
    },

    dragStart(id) {
      this.tareaArrastrada = id;
    },

    dragEnd() {
      this.tareaArrastrada = null;
    },

    handleDrop() {
      if (this.tareaArrastrada !== null) {
        this.eliminarTarea(this.tareaArrastrada);
      }
    },

    async eliminarTarea(id) {
      try {
        //await fetch(`/api/tareas/${id}`, { method: "DELETE" });
        this.tareas = this.tareas.filter(t => t.id !== id);
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  },

  watch: {
    id() {
      this.cargarTareas();
    }
  },

  mounted() {
    this.cargarTareas();
  }

}
</script>

<template>
  <div class="container">
    <section class="tareas">
      <h2>Tareas</h2>
      <ul>
        <li v-for="tarea in tareas" :key="tarea.id"
            :class="{ completada: tarea.completada }"
            draggable="true"
            @dragstart="dragStart(tarea.id)"
            @dragend="dragEnd">
          <span>{{ tarea.nombre }}</span>
          <div class="acciones">
            <router-link :to="`/tarea/${tarea.id}`" class="btn">Ver</router-link>
            <button @click="completarTarea(tarea.id)" class="btn">
              {{ tarea.completada ? "Reabrir" : "Completar" }}
            </button>
            <button @click="eliminarTarea(tarea.id)" class="btn eliminar">Eliminar</button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Zona de eliminación -->
    <div class="dropzone" @dragover.prevent @drop="handleDrop">
      🗑️ Arrastra aquí para eliminar
    </div>
  </div>

</template>

<style scoped>

.container {
  width: 90%;
  max-width: 600px;
  background: #fef7e5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 2px solid #d1a36c; /* Borde rústico */
}

h2 {
  text-decoration: underline;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #8c5a2b;
  text-shadow: 1px 1px 0 #fdf5e6;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #e3c08d url('https://www.transparenttextures.com/patterns/wood-pattern.png');
  color: #5c3a21;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: grab;
}

li:hover {
  transform: scale(1.02);
}

li:active {
  cursor: grabbing;
  opacity: 0.7;
}

li.completada {
  background: #dac0a3;
  text-decoration: line-through;
  color: #6b4f31;
}

.btn {
  background: #a67c52;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 2px;
  transition: background 0.3s ease;
  font-size: 14px;
}

.btn.eliminar {
  background: #c44d34;
}

.btn:hover {
  background: #8c6239;
}

.btn.eliminar:hover {
  background: #a63a21;
}

.acciones {
  display: flex;
  gap: 5px;
}

.dropzone {
  margin-top: 20px;
  padding: 15px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  background: #ffdddd;
  border: 2px dashed #ff6b6b;
  border-radius: 10px;
  transition: background 0.3s ease-in-out;
}

.dropzone:hover {
  background: #ffb3b3;
}

</style>