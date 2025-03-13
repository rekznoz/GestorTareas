<script>
export default {
  name: "Comentarios",
  props: {
    comentarios: {
      type: Array,
      required: true
    },
    paginaActual: {
      type: Number,
      required: true
    },
    totalPaginas: {
      type: Number,
      required: true
    }
  },
  emits: ["cambiarPagina"]
};
</script>

<template>
  <section v-if="comentarios.length > 0" class="comentarios">
    <h3>📝 Comentarios</h3>
    <ul>
      <li v-for="comentario in comentarios" :key="comentario.id">
        <p><strong>{{ comentario.user.name }}</strong>: {{ comentario.comentario }}</p>
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
</template>

<style scoped>
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
