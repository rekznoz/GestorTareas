<script>
export default {
  name: "Login"
}
</script>

<template>
  <div class="container">
    <section class="descripcion">
      <h2>¡Bienvenido!</h2>
      <p>Por favor, inicia sesión para acceder a la aplicación.</p>
    </section>
    <section class="formulario">
      <form action="">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Tu email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Tu contraseña" required>
        </div>
        <button type="submit" class="btn">Iniciar Sesión</button>
      </form>
      <span class="registro">¿No tienes una cuenta? <router-link to="/registro">Regístrate</router-link></span>
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
  background-color: #f8f9fa;
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

.registro {
  margin-top: 20px;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
}

.registro a {
  text-decoration: none;
  color: #007bff;
}

.registro a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .formulario {
    padding: 30px 10px;
  }
}

</style>