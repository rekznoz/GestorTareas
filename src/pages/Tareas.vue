<script>
import {getTareasUsuario} from "@/helper/getTareasUsuario.js";
import {crearTarea} from "@/helper/crearTarea.js";
import Swal from "sweetalert2";
import userStore from "@/stores/userStore.js";
import router from "@/router/router.js";

export default {
  name: "Tareas",

  data() {
    return {
      tareas: [],
      tareasPaginadas: [],
      tareaArrastrada: null,
      paginaActual: 1,
      tareasPorPagina: 10,
    };
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  methods: {

    userStore,

    completarTarea(id) {
      console.log(id)
    },

    async cargarTareas() {
      try {
        this.tareas = await getTareasUsuario(this.id);
        this.paginaActual = 1;
        this.actualizarPaginacion();
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
        this.actualizarPaginacion();

      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    },

    actualizarPaginacion() {
      const inicio = (this.paginaActual - 1) * this.tareasPorPagina;
      const fin = inicio + this.tareasPorPagina;
      this.tareasPaginadas = this.tareas.slice(inicio, fin);
    },

    cambiarPagina(nuevaPagina) {
      if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
        this.paginaActual = nuevaPagina;
        this.actualizarPaginacion();
      }
    },

    mostrarModalCrearTarea() {
      const modal = document.querySelector(".contenedor-modal-crear-tarea");
      modal.style.display = "flex";
    },

    ocultarModalCrearTarea() {
      const modal = document.querySelector(".contenedor-modal-crear-tarea");
      modal.style.display = "none";
    },

    enviarFormularioTarea() {
      const form = document.querySelector(".modal-crear-tarea");

      if (!form.checkValidity()) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Todos los campos son obligatorios",
        });
        return
      }

      if (form.fecha_inicio.value > form.fecha_fin.value) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La fecha de inicio debe ser anterior a la fecha de fin",
        });
        return;
      }

      const formData = new FormData(form);
      const tarea = Object.fromEntries(formData.entries());
      crearTarea(tarea).then(
          (tarea) => {
            console.log(tarea.data);
            this.tareas.push(tarea.data);
            this.actualizarPaginacion();
            this.ocultarModalCrearTarea();
          },
          (error) => {
            console.error("Error al crear la tarea:", error);
          }
      )

    }

  },

  watch: {
    id() {
      this.cargarTareas();
    }
  },

  mounted() {
    this.cargarTareas();
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.tareas.length / this.tareasPorPagina);
    }
  },

}
</script>

<template>
  <div class="container">
    <section class="tareas" v-if="tareasPaginadas.length >= 1">
      <h2>Tareas</h2>
      <ul>
        <li v-for="tarea in tareasPaginadas" :key="tarea.id"
            :class="{ completada: tarea.completada }"
            draggable="true"
            @dragstart="dragStart(tarea.id)"
            @dragend="dragEnd">
          <span>{{ tarea.nombre }}</span>
          <div class="acciones">
            <router-link :to="`/tarea/${tarea.id}`" class="btn">Ver</router-link>
            <button v-if="userStore().user.id === tarea.user_id" @click="completarTarea(tarea.id)" class="btn">
              {{ tarea.completada ? "Reabrir" : "Completar" }}
            </button>
            <button v-if="userStore().user.id === tarea.user_id" @click="eliminarTarea(tarea.id)" class="btn eliminar">
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </section>
    <section v-else class="tareas">
      <h2 v-if="userStore().user.id !== id">Este usuario no tiene tareas!</h2>
      <h2 v-else>No tienes tareas!</h2>
    </section>

    <div v-if="totalPaginas > 1" class="paginacion">
      <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">
        <
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">
        >
      </button>
    </div>

    <!-- Zona de eliminación -->
    <div v-if="userStore().user.id === id && tareasPaginadas.length >= 1" class="dropzone" @dragover.prevent
         @drop="handleDrop">
      🗑️ Arrastra aquí para eliminar
    </div>

    <button v-if="userStore().user.id === id" @click="mostrarModalCrearTarea" class="btn-crear">Crear Tarea</button>

  </div>

  <!-- Modal para crear tarea -->
  <!--
    {
    "nombre": "Desarrollar API de Tareas",
    "descripcion": "Crear el CRUD de tareas usando Laravel.",
    "fecha_inicio": "2025-03-08",
    "fecha_fin": "2025-03-15",
    "estado": "pendiente"
    }
   -->
  <div class="contenedor-modal-crear-tarea">
    <form class="modal-crear-tarea" @submit.prevent="enviarFormularioTarea">
      <h2>Crear Tarea</h2>
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required>
      <label for="descripcion">Descripción:</label>
      <textarea id="descripcion" name="descripcion" required></textarea>
      <label for="fecha_inicio">Fecha de inicio:</label>
      <input type="date" id="fecha_inicio" name="fecha_inicio" required>
      <label for="fecha_fin">Fecha de fin:</label>
      <input type="date" id="fecha_fin" name="fecha_fin" required>
      <label for="estado">Estado:</label>
      <select id="estado" name="estado" required>
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En Proceso</option>
        <option value="completada">Completada</option>
      </select>
      <input type="number" id="user_id" name="user_id" hidden>
      <button type="submit">Crear</button>
      <button type="reset" @click="ocultarModalCrearTarea">Cancelar</button>
    </form>
  </div>

</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  width: 70%;
  background: #fef7e5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 2px solid #d1a36c; /* Borde rústico */
  margin-bottom: 30px;
  margin-top: 30px;
}

h2 {
  text-decoration: underline;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 25px;
  color: #8c5a2b;
  text-shadow: 1px 1px 0 #fdf5e6;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  list-style: none;
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
  text-align: left;
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

.paginacion {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.paginacion button {
  background: #a67c52;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.paginacion button:disabled {
  background: #ccc;
  cursor: not-allowed;
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

.btn-crear {
  background: #a67c52;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.btn-crear:hover {
  background: #8c6239;
}

@media (max-width: 1150px) {
  .container {
    width: 90%;
  }
}

@media (max-width: 900px) {
  ul {
    grid-template-columns: 1fr;
  }

  .dropzone {
    font-size: 1rem;
  }
}

/* Modal */

.contenedor-modal-crear-tarea {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-crear-tarea {
  width: 25%;
  background: white;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-crear-tarea h2 {
  text-decoration: underline;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 25px;
  color: #8c5a2b;
  text-shadow: 1px 1px 0 #fdf5e6;
}

.modal-crear-tarea label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

.modal-crear-tarea input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.modal-crear-tarea textarea {
  width: 100%;
  padding-bottom: 100px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: none;
}

.modal-crear-tarea select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.modal-crear-tarea button {
  width: 100%;
  background: #a67c52;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.modal-crear-tarea button:hover {
  background: #8c6239;
}

@media (max-width: 1000px) {
  .modal-crear-tarea {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .modal-crear-tarea {
    width: 70%;
  }
}

</style>