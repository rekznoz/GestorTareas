<script>
export default {
  name: "Contacto"
}
</script>

<template>
  <div class="container">
    <section class="descripcion">
      <h2>¡Contáctanos!</h2>
      <p>¿Tienes alguna duda, sugerencia o problema con la aplicación? ¡Estamos aquí para ayudarte! Completa el
        formulario
        de contacto y nos pondremos en contacto contigo lo antes posible.</p>
    </section>
    <section class="formulario">
      <form action="">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Tu email" required>
        </div>
        <div class="form-group">
          <label for="mensaje">Mensaje</label>
          <textarea name="mensaje" id="mensaje" cols="30" rows="10" placeholder="Escribe tu mensaje"
                    required></textarea>
        </div>
        <button type="submit" class="btn">Enviar</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 25px auto;
  padding: 0 20px;
}

/* Descripción */

.descripcion {
  text-align: center;
  margin-top: 50px;
  background-color: var(--color-fondo-terciario);
  padding: 25px 25px;
  border-radius: 10px;
  margin-bottom: 40px;
}

.descripcion h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.descripcion p {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

/* Formulario */

.formulario {
  background-color: var(--color-fondo-cuaternario);
  padding: 50px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: none;
  height: 200px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
}

.btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .formulario {
    padding: 30px 10px;
  }
}

</style>