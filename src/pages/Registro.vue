<script>
import {computed} from "vue";
import {mapState} from "pinia";
import userStore from "@/stores/userStore.js";
import {registerUsuarioAuth} from "@/helper/getUsuarioAuth.js";
import Swal from "sweetalert2";

export default {
  name: "Registro",
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  computed: {
    passwordIgual() {
      return this.password === this.password_confirmation;
    },
    ...mapState(userStore, ["user", "isLoggedIn"]),
  },
  methods: {

    /**
     * Registra un usuario en la base de datos.
     */
    async registrar() {

      if (!this.nombre || !this.email || !this.password || !this.password_confirmation) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      if (!this.password.length >= 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (!this.passwordIgual) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      registerUsuarioAuth(this.nombre, this.email, this.password, this.password_confirmation).then(
        (usuario) => {
          if (usuario.error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el usuario',
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
            text: 'No se pudo registrar el usuario',
          })
        }
      )
    },
  }
}

</script>

<template>
  <div class="container">
    <section class="formulario">
      <form @submit.prevent="registrar">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input v-model="nombre" type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" name="email" placeholder="Tu email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" name="password" placeholder="Tu contraseña" required>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirmar Contraseña</label>
          <input v-model="password_confirmation" type="password_confirmation" id="password_confirmation" name="password_confirmation" placeholder="Confirma tu contraseña" required>
        </div>
        <button type="submit" class="btn">Registrarse</button>
      </form>
      <span class="registro">¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></span>
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

/* Formulario */

.formulario {
  background-color: var(--color-fondo-cuaternario);
  padding: 50px 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
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