<script>
import {getTareaID} from "@/helper/getTareaID.js";
import getComentarioFromTarea from "@/helper/getComentariosFromTarea.js";
import crearComentario from "@/helper/crearComentario.js"; // Importar la función
import Comentarios from "@/components/Comentarios.vue";

export default {
  name: "Tarea",
  components: {
    Comentarios,
  },
  data: () => ({
    tarea: {},
    cargando: true,
    comentarios: [],
    comentariosPagina: [],
    paginaActual: 1,
    comentariosPorPagina: 5,
    totalComentarios: 0,
    modalAbierto: false, // Controla la visibilidad del modal
    nuevoComentario: "", // Guarda el texto del comentario
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
        this.cargarComentarios();
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

    abrirModal() {
      this.modalAbierto = true;
    },

    cerrarModal() {
      this.modalAbierto = false;
      this.nuevoComentario = ""; // Limpiar el input
    },

    async enviarComentario() {
      if (!this.nuevoComentario.trim()) {
        alert("El comentario no puede estar vacío");
        return;
      }

      try {
        await crearComentario({
          tarea_id: this.id,
          contenido: this.nuevoComentario,
        });

        this.cerrarModal();
        this.cargarComentarios(); // Recargar los comentarios
      } catch (error) {
        console.error(error);
        alert("Error al enviar el comentario");
      }
    },
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
      <p><strong>👤 Usuario:</strong> {{ tarea.user ? tarea.user.name : "Desconocido" }}</p>
    </section>

    <section v-else class="descripcion">
      <h2>No se encontró la tarea</h2>
    </section>

    <router-link :to="`/tareas/${usuarioID}`" class="btn">
      Ver tareas de {{ usuarioNombre }}
    </router-link>

    <!-- Botón para abrir el modal -->
    <button @click="abrirModal" class="btn btn-primario">
      ➕ Agregar Comentario
    </button>

    <!-- Modal de comentario -->
    <div v-if="modalAbierto" class="modal">
      <div class="modal-contenido">
        <h3>Nuevo Comentario</h3>
        <textarea v-model="nuevoComentario" placeholder="Escribe tu comentario aquí..." class="textarea"></textarea>
        <div class="modal-acciones">
          <button @click="cerrarModal" class="btn btn-secundario">Cancelar</button>
          <button @click="enviarComentario" class="btn btn-primario">Enviar</button>
        </div>
      </div>
    </div>

    <!-- Lista de comentarios -->
    <Comentarios
        :comentarios="comentariosPagina"
        :paginaActual="paginaActual"
        :totalPaginas="totalPaginas"
        @cambiarPagina="cambiarPagina"
    />
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-contenido {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
}

.textarea {
  width: 100%;
  height: 80px;
  margin-top: 10px;
}

.modal-acciones {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.btn-primario {
  background: #007bff;
  color: white;
}

.btn-secundario {
  background: #ccc;
  color: black;
}

</style>