<script>

import {getTareaID} from "@/helper/getTareaID.js";

export default {
  name: "Tarea",
  data: () => ({
    tarea: {},
    cargando: true
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
      } catch (error) {
        console.error(error);
      }
    }
  },

  watch: {
    id() {
      this.cargarTarea();
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
    }
  }

}
/*
{
    "id": 1,
    "nombre": "Voluptas aut alias.",
    "descripcion": "Neque sequi totam ut delectus similique quaerat. Sapiente dolore ea nihil. Quidem sit voluptas dolore neque. Doloribus ipsam vitae voluptas enim maxime necessitatibus temporibus.",
    "fecha_inicio": "2013-01-12",
    "fecha_fin": "1975-07-07",
    "estado": "en_proceso",
    "user": {
        "id": 2,
        "name": "Carlos Portillo",
        "email": "alejandro02@example.net",
        "email_verified_at": "2025-03-08T12:53:56.000000Z",
        "created_at": "2025-03-08T12:53:56.000000Z",
        "updated_at": "2025-03-08T12:53:56.000000Z"
    }
}
 */
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



</style>