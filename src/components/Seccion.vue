<script>
export default {
  name: "Seccion",
  props: {
    titulo: {
      type: String,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
    enlaceTexto: {
      type: String,
      required: true
    },
    enlaceHref: {
      type: String,
      default: "#" // Si no se proporciona un enlace, se queda en "#"
    },
    bgColor: {
      type: String,
      default: "#f8f9fa" // Color de fondo por defecto
    }
  }
}
</script>

<template>
  <section class="seccion" >
    <h2>{{ titulo }}</h2>
    <p>{{ texto }}</p>
    <a :href="enlaceHref" class="btn">{{ enlaceTexto }}</a>
  </section>
</template>

<style scoped>
.seccion {
  text-align: center;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  background-color: var(--color-fondo-cuaternario);
}

.seccion h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.seccion p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .seccion {
    padding: 30px 10px;
  }

  .seccion h2 {
    font-size: 2rem;
  }

  .seccion p {
    font-size: 1rem;
  }
}

@media (max-width: 500px) {
  .seccion h2 {
    font-size: 1.5rem;
  }

  .seccion p {
    font-size: 0.9rem;
  }
}
</style>
