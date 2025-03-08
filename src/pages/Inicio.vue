<script>
export default {
  name: "Inicio"
}
</script>

<template>

  <div class="container">

    <section class="descripcion">
      <h2>¿Qué es TareasEverywhere?</h2>
      <p>TareasEverywhere es una aplicación web diseñada para ayudarte a organizar y priorizar tus tareas diarias. Olvídate
        del
        caos y di hola a la productividad, ¡porque hasta tus pendientes merecen un poco de orden!</p>
      <a href="#caracteristicas" class="btn">Descubre sus funcionalidades</a>
    </section>

    <section id="caracteristicas">
      <h2>Características Destacadas</h2>
      <div class="caracteristicas">
        <div class="caracteristica">
          <h3>Gestión Intuitiva</h3>
          <p>Organiza tus tareas de manera sencilla y visual. Con arrastrar y soltar, planificar tu día nunca fue tan
            divertido (y productivo).</p>
        </div>
        <div class="caracteristica">
          <h3>Recordatorios y Notificaciones</h3>
          <p>Olvida el "lo haré mañana": nuestras notificaciones inteligentes te recordarán tus deadlines a tiempo.</p>
        </div>
        <div class="caracteristica">
          <h3>Integración Multiplataforma</h3>
          <p>Accede a tus tareas desde cualquier dispositivo. Porque sabemos que la inspiración no espera a que estés
            frente a un ordenador.</p>
        </div>
        <div class="caracteristica">
          <h3>Colaboración en Equipo</h3>
          <p>Comparte, asigna y colabora en proyectos con tu equipo. La sinergia de ideas se traduce en resultados
            sorprendentes.</p>
        </div>
        <div class="caracteristica">
          <h3>Informes y Estadísticas</h3>
          <p>Mide tu productividad con dashboards intuitivos que te muestran cómo y dónde invertir tu energía (¡sin
            dramas!).</p>
        </div>
        <div class="caracteristica">
          <h3>Interfaz Moderna y Personalizable</h3>
          <p>Disfruta de una experiencia de usuario limpia y elegante que se adapta a tus gustos y necesidades.</p>
        </div>
      </div>
    </section>

    <section class="motivacion">
      <h2>¿Listo para transformar tu rutina?</h2>
      <p>Únete a cientos de usuarios que ya han dado el salto hacia una organización más eficiente. ¡Que tus tareas sean
        el combustible de tu éxito!</p>
      <a href="#contacto" class="btn">Empezar ahora</a>
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

/* Características */

#caracteristicas {
  margin-bottom: 40px;
  background-color: #cccccc;
  padding: 50px 20px;
  border-radius: 10px;
}

#caracteristicas h2 {
  font-size: 2.5rem;
  margin-bottom: 35px;
  text-align: center;
  text-decoration: underline;
}

.caracteristicas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.caracteristica {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.caracteristica h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-style: italic;
  text-decoration: underline;
}

.caracteristica p {
  font-size: 1rem;
}

/* Motivación */

.motivacion {
  text-align: center;
  background-color: #f8f9fa;
  padding: 50px 20px;
  border-radius: 10px;
}

.motivacion h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.motivacion p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.motivacion .btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.motivacion .btn:hover {
  background-color: #0056b3;
}

</style>