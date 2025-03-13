<script>
import {getTareaID} from "@/helper/getTareaID.js";
import getComentarioFromTarea from "@/helper/getComentariosFromTarea.js";
import Comentarios from "@/components/Comentarios.vue";
import ModalComentario from "@/components/ModalComentario.vue"; // Importamos el modal

export default {
  name: "Tarea",
  components: {
    Comentarios,
    ModalComentario, // Registramos el modal
  },
  data: () => ({
    tarea: {},
    cargando: true,
    comentarios: [],
    comentariosPagina: [],
    paginaActual: 1,
    comentariosPorPagina: 5,
    totalComentarios: 0,
    modalAbierto: false, // Estado para abrir/cerrar el modal
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
        if (this.tarea && this.tarea.id) {
          await this.cargarComentarios();
        }
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
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
      const fin = Math.min(this.paginaActual * this.comentariosPorPagina, this.comentarios.length);
      this.comentariosPagina = this.comentarios.slice(inicio, fin);
    },

    cambiarPagina(pagina) {
      if (pagina > 0 && pagina <= Math.max(1, this.totalPaginas)) {
        this.paginaActual = pagina;
        this.cargarComentariosPagina();
      }
    },

    abrirModal() {
      this.modalAbierto = true;
    },

    cerrarModal() {
      this.modalAbierto = false;
    },

    agregarComentario(comentario) {
      this.comentarios.unshift(comentario);
      this.totalComentarios++;
      this.cargarComentariosPagina();
      this.cerrarModal();
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
      return this.tarea.user?.id ?? null;
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
      <p v-if="tarea.descripcion">{{ tarea.descripcion }}</p>
      <p><strong>📅 Fecha de inicio:</strong> {{ tarea.fecha_inicio }}</p>
      <p><strong>⏳ Fecha de fin:</strong> {{ tarea.fecha_fin }}</p>
      <p><strong>✅ Estado:</strong> {{ tarea.estado }}</p>
      <p><strong>👤 Usuario:</strong> {{ usuarioNombre }}</p>
    </section>

    <section v-else class="descripcion">
      <h2>No se encontró la tarea</h2>
    </section>

    <router-link v-if="usuarioID" :to="`/tareas/${usuarioID}`" class="btn">
      Ver tareas de {{ usuarioNombre }}
    </router-link>

    <!-- Botón para abrir el modal -->
    <button @click="abrirModal" class="btn btn-agregar">➕ Agregar Comentario</button>

    <!-- Componente de Comentarios -->
    <Comentarios
        :comentarios="comentariosPagina"
        :paginaActual="paginaActual"
        :totalPaginas="totalPaginas"
        @cambiarPagina="cambiarPagina"
    />

    <!-- Modal para agregar comentario -->
    <ModalComentario v-if="modalAbierto" @cerrar="cerrarModal" @guardar="agregarComentario"/>
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

.btn-agregar {
  margin-top: 10px;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-agregar:hover {
  background: #218838;
}

</style>