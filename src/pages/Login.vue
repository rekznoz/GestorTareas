<script>
import {mapState} from "pinia";
import userStore from "@/stores/userStore.js";
import {getUsuarioAuth} from "@/helper/getUsuarioAuth.js";
import Swal from 'sweetalert2'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user", "isLoggedIn"]),
  },
  methods: {

    /**
     * Método para iniciar sesión
     */
    login() {
      if (!this.email || !this.password) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      getUsuarioAuth(this.email, this.password)
          .then((usuario) => {
                if (usuario.error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos',
                  })
                } else {
                  userStore().login(usuario);
                  this.$router.push("/");
                }
              },
              () => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Usuario o contraseña incorrectos',
                })
              }
          )
    },
  },
};
</script>

<template>
  <div class="container">
    <section class="descripcion">
      <h2>¡Bienvenido!</h2>
      <p>Por favor, inicia sesión para acceder a la aplicación.</p>
    </section>
    <section class="formulario">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" name="email" placeholder="Tu email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" name="password" placeholder="Tu contraseña" required>
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
  color: var(--color-texto-secundario);
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
  background-color: var(--color-fondo-terciario);
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

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.form-group span {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  margin-top: 10px;
  display: block;
  text-transform: capitalize;
  text-align: center;
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
  color: var(--color-texto-terciario);
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