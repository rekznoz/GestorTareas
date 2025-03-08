<script>
export default {
  name: "Error"
}
</script>

<template>
  <div class="container">
    <section class="descripcion">
      <h2>¡Ups! Parece que te has perdido</h2>
      <p>La página que buscas no existe o ha sido movida. No te preocupes, puedes volver a la página de inicio haciendo clic
        en el botón de abajo.</p>
      <router-link to="/" class="btn">Volver a Inicio</router-link>
    </section>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Descripción */

  .descripcion {
    text-align: center;
    margin-top: 50px;
    background-color: #f8f9fa;
    padding: 50px 20px;
    border-radius: 10px;
    margin-bottom: 40px;
  }

  .descripcion h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .descripcion p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  .descripcion .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }

  .descripcion .btn:hover {
    background-color: #0056b3;
  }
</style>