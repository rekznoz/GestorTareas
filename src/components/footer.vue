<script>
export default {
  name: "Footer"
}
</script>

<template>
  <footer class="footer">
    <p class="footer-text">© 2025 - Todos los derechos reservados</p>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(90deg, var(--color-fondo-secundario), var(--color-fondo-principal));
  color: var(--color-texto-principal);
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.footer::before {
  content: "";
  display: block;
  width: 100px;
  height: 4px;
  background: var(--color-resaltado-oscuro);
  margin: 0 auto 10px auto;
  border-radius: 2px;
}

.footer-text {
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer:hover .footer-text {
  opacity: 1;
  color: var(--color-resaltado-oscuro);
}

@media (max-width: 768px) {
  .footer {
    font-size: 14px;
  }
}

</style>