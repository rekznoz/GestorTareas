<script>
export default {
  name: "Indecision",
  data() {
    return {
      preguntaTemporal: "",
      pregunta: "",
      respuesta: "",
      imagen: ""
    };
  },
  methods: {

    async obtenerRespuesta() {
      try {
        const respuesta = await fetch("https://yesno.wtf/api");
        const data = await respuesta.json();
        this.respuesta = data.answer;
        this.imagen = data.image;
      } catch (error) {
        this.respuesta = "Hubo un problema con la API.";
        console.error(error);
      }
    },

    /*
    guardarPregunta() {
      this.pregunta = "";
      this.respuesta = "Pensando...";
      this.imagen = "";
      if (this.preguntaTemporal.trim()) {
        if (this.preguntaTemporal.endsWith("?")) {
          this.pregunta = this.preguntaTemporal;
          this.obtenerRespuesta();
        } else {
          this.respuesta = "Las preguntas terminan en signo de interrogación.";
        }
      }
    },

     */

    guardarPregunta() {
      // Se establece la respuesta por defecto e imagen vacía
      this.respuesta = "Pensando...";
      this.imagen = "";

      // Se obtiene la pregunta sin espacios al inicio o final
      const preguntaLimpia = this.preguntaTemporal.trim();

      // Si la pregunta está vacía, se sale de la función
      if (!preguntaLimpia) return;

      // Se verifica que la pregunta termine con '?'
      if (!preguntaLimpia.endsWith("?")) {
        this.respuesta = "Las preguntas terminan en signo de interrogación.";
        return;
      }

      this.pregunta = preguntaLimpia;
      this.obtenerRespuesta();
    }

  },
  watch: {
    pregunta(value, oldValue) {
      if (value !== oldValue) {
        this.respuesta = "";
        this.imagen = "";
      }
    },
  },
}
</script>

<!-- https://yesno.wtf/#api -->

<template>
  <div>
    <img v-if="imagen" :src="imagen" alt="Imagen de la respuesta"/>
    <div class="bg-dark"></div>
    <div class="indecision-container">
      <h1>Indecision App</h1>
      <p>Haz tu pregunta</p>
      <input
          type="text"
          placeholder="Escribe tu pregunta"
          v-model="preguntaTemporal"
          @keyup.enter="guardarPregunta"
      />
      <h1>{{ pregunta }}</h1>
      <h2>{{ respuesta === "yes" ? "Si" : "No" }}</h2>
    </div>
  </div>
</template>

<style scoped>
img, .bg-dark {
  height: 100vh;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0;
}

h1, h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>