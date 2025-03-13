<script>
import {getTareaID} from "@/helper/getTareaID.js";
import getComentarioFromTarea from "@/helper/getComentariosFromTarea.js";
import crearComentario from "@/helper/crearComentario.js";
import Swal from "sweetalert2";
import eliminarComentario from "@/helper/eliminarComentario.js";

export default {
  name: "Tarea",
  data: () => ({
    tarea: {},
    cargando: true,
    comentarios: [],
    comentariosPagina: [],
    paginaActual: 1,
    comentariosPorPagina: 5,
    totalComentarios: 0,
    mostrarModal: false,
    nuevoComentario: {
      comentario: "",
      tarea_id: 0,
      user_id: 0,
    }
  }),
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async cargarTarea() {
      try {
        this.tarea = await getTareaID(this.id);
        this.cargando = false;
        await this.cargarComentarios();
      } catch (error) {
        console.error(error);
      }
    },

    async cargarComentarios() {
      try {
        this.comentarios = await getComentarioFromTarea(this.id);
        this.totalComentarios = this.comentarios.length;
        this.cargarComentariosPagina();
      } catch (error) {
        console.error(error);
      }
    },

    cargarComentariosPagina() {
      const inicio = (this.paginaActual - 1) * this.comentariosPorPagina;
      const fin = this.paginaActual * this.comentariosPorPagina;
      this.comentariosPagina = this.comentarios.slice(inicio, fin);
    },

    cambiarPagina(pagina) {
      if (pagina > 0 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        this.cargarComentariosPagina();
      }
    },

    abrirModalCrearComentario() {
      this.mostrarModal = true;
    },

    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoComentario = {
        comentario: "",
        tarea_id: 0,
        user_id: 0,
      };
    },

    crearComentario() {
      const form = document.querySelector(".modal-form");

      if (!form.checkValidity()) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Todos los campos son obligatorios",
        });
        return;
      }

      this.nuevoComentario.tarea_id = this.id;
      this.nuevoComentario.user_id = this.usuarioID;

      const formData = {...this.nuevoComentario};

      crearComentario(formData)
          .then((respuesta) => {
            console.log(respuesta);
            this.cargarComentarios();
            this.cerrarModal();
            Swal.fire({
              icon: "success",
              title: "Comentario creado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al crear el comentario",
            });
          });
    },

    borrarComentario(id) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no se podrá recuperar el comentario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await eliminarComentario(id).then(() => {
              Swal.fire("Eliminado", "El comentario ha sido eliminado.", "success");
              this.comentarios = this.comentarios.filter((comentario) => comentario.id !== id)
              this.$emit("cambiarPagina", this.paginaActual);
            });
          } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo eliminar el comentario.", "error");
          }
        }
      });
    }
  },

  watch: {
    id() {
      this.cargarTarea();
    },
  },

  mounted() {
    this.cargarTarea();
  },

  computed: {
    usuarioNombre() {
      return this.tarea.user ? this.tarea.user.name : "Desconocido";
    },
    usuarioID() {
      return this.tarea.user ? this.tarea.user.id : "Desconocido";
    },
    totalPaginas() {
      return Math.max(1, Math.ceil(this.totalComentarios / this.comentariosPorPagina));
    },
  },
};
</script>

<template>
  <div class="container">

    <section v-if="cargando" class="descripcion">
      <h2>Cargando...</h2>
    </section>

    <section v-else-if="tarea" class="descripcion">
      <h2>{{ tarea.nombre }}</h2>
      <p>{{ tarea.descripcion }}</p>
      <p><strong>📅 Fecha de inicio:</strong> {{ tarea.fecha_inicio }}</p>
      <p><strong>⏳ Fecha de fin:</strong> {{ tarea.fecha_fin }}</p>
      <p><strong>✅ Estado:</strong> {{ tarea.estado }}</p>
      <p><strong>👤 Usuario:</strong> {{ tarea.user?.name || "Desconocido" }}</p>
    </section>

    <section v-else class="descripcion">
      <h2>No se encontró la tarea</h2>
    </section>

    <div class="acciones">
      <router-link :to="`/tareas/${usuarioID}`" class="btn">
        Ver tareas de {{ usuarioNombre }}
      </router-link>
      <button class="btn" @click="abrirModalCrearComentario">
        📝 Crear comentario
      </button>
    </div>

    <!-- Lista de comentarios -->
    <section v-if="comentarios.length > 0" class="comentarios">
      <h3>📝 Comentarios</h3>
      <ul>
        <li v-for="comentario in comentarios" :key="comentario.id">
          <p><strong>{{ comentario.user.name }}</strong>: {{ comentario.comentario }}</p>
          <button @click="borrarComentario(comentario.id)" class="btn-eliminar">Eliminar</button>
        </li>
      </ul>

      <!-- Paginación -->
      <div class="paginacion">
        <button @click="$emit('cambiarPagina', paginaActual - 1)" :disabled="paginaActual <= 1">
          Anterior
        </button>
        <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button @click="$emit('cambiarPagina', paginaActual + 1)" :disabled="paginaActual >= totalPaginas">
          Siguiente
        </button>
      </div>
    </section>

    <p v-else class="no-comentarios">No hay comentarios aún.</p>

    <!-- Modal para crear comentario -->
    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal" @click.stop>
        <h3>Crear Comentario</h3>
        <form @submit.prevent="crearComentario" class="modal-form">
          <div>
            <textarea
                v-model="nuevoComentario.comentario"
                id="comentario"
                rows="4"
                required
                placeholder="Escribe tu comentario..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" @click="cerrarModal">Cancelar</button>
            <button type="submit">Guardar Comentario</button>
          </div>
          <input type="number" id="tarea_id" name="tarea_id" hidden>
          <input type="number" id="user_id" name="user_id" hidden>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

.container {
  width: 90%;
  max-width: 500px;
  background: #fef7e5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 2px solid #d1a36c;
}

.descripcion {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #e3c08d url('https://www.transparenttextures.com/patterns/wood-pattern.png');
  border-radius: 8px;
  color: #5c3a21;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
}

.descripcion h2 {
  color: #8c5a2b;
  text-shadow: 1px 1px 0 #fdf5e6;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: bold;
}

.descripcion p {
  margin: 8px 0;
  font-size: 16px;
  padding-top: 5px;
}

.descripcion strong {
  color: #6b4f31;
  font-weight: bold;
}

button {
  cursor: pointer;
  border: none;
}

.acciones {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

.btn strong {
  font-weight: bold;
  text-decoration: underline;
}

.btn:hover {
  background-color: #0056b3;
}

/* Estilos del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin-bottom: 20px;
}

.modal textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  resize: none;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #ccc;
}

.modal-actions button:last-child {
  background-color: #28a745;
  color: white;
}

.modal-actions button:hover {
  opacity: 0.8;
}

/* Estilos de la lista de comentarios */

.comentarios {
  margin-top: 20px;
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;
  color: #333;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
}

.comentarios h3 {
  color: #007bff;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.comentarios ul {
  list-style: none;
  padding: 0;
}

.comentarios li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;

}

.no-comentarios {
  text-align: center;
  font-style: italic;
  color: #888;
}

.paginacion {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paginacion button {
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.paginacion button:disabled {
  background-color: #ccc;
}

.paginacion span {
  font-size: 1.2rem;
}

.btn-eliminar {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

</style>