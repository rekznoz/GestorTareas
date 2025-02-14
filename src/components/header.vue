<script>
export default {
  name: "header"
}
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="#" class="nav-link">Inicio</a>
        </li>
      </ul>
    </nav>
  </header>
</template>


<style scoped>
.header {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  padding: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

/* Enlaces de navegación */
.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 3px;
  background: #ffcc00;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #ffcc00;
}

@media (max-width: 768px) {
  .nav-list {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

</style>