<script>
import Contador from './components/Contador.vue'
import Indecision from "./components/Indecision.vue"

export default {
  components: {
    Contador,
    Indecision
  }
}

</script>

<template>
  <div>
    <h1>App</h1>
    <Indecision/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
