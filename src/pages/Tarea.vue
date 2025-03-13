<script>

import {getTareaID} from "@/helper/getTareaID.js";
import getComentarioFromTarea from "@/helper/getComentariosFromTarea.js";

export default {
  name: "Tarea",
  data: () => ({
    tarea: {},
    cargando: true,
    comentarios: [],
    comentariosPagina: [],
    paginaActual: 1,
    comentariosPorPagina: 5,
    totalComentarios: 0
  }),

  props: {
    id: {
      type: Number,
      required: true
    }
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
      this.comentariosPagina = this.comentarios.slice(inicio, fin);  // Cortamos los comentarios según la página actual
    },

    cambiarPagina(pagina) {
      if (pagina > 0 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        this.cargarComentariosPagina();  // Recargamos los comentarios para la nueva página
      }
    }
  },

  watch: {
    id() {
      this.cargarTarea();
    },
    tarea(newTarea) {
      if (newTarea && Object.keys(newTarea).length > 0) {
        this.comentarios = getComentarioFromTarea(newTarea);
      }
    }
  },

  mounted() {
    this.cargarTarea();
  },

  computed: {
    usuarioNombre() {
      return this.tarea.user ? this.tarea.user.name : 'Desconocido';
    },
    usuarioID() {
      return this.tarea.user ? this.tarea.user.id : 'Desconocido';
    },
    totalPaginas() {
      return Math.ceil(this.totalComentarios / this.comentariosPorPagina);  // Calculamos el total de páginas
    }
  }

}

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
      <p><strong>👤 Usuario:</strong> {{ tarea.user ? tarea.user.name : 'Desconocido' }}</p>
    </section>
    <section v-else class="descripcion">
      <h2>No se encontró la tarea</h2>
    </section>
    <router-link :to="`/tareas/${usuarioID}`" class="btn">Ver tareas de {{ usuarioNombre }}</router-link>

    <section v-if="comentariosPagina.length > 0" class="comentarios">
      <h3>📝 Comentarios</h3>
      <ul>
        <li v-for="comentario in comentariosPagina" :key="comentario.id">
          <p><strong>{{ comentario.user.name }}</strong>: {{ comentario.comentario }}</p>
        </li>
      </ul>

      <!-- Paginación -->
      <div class="paginacion">
        <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual <= 1">
          Anterior
        </button>
        <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual >= totalPaginas">
          Siguiente
        </button>
      </div>
    </section>

    <p v-else class="no-comentarios">No hay comentarios aún.</p>

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

</style>