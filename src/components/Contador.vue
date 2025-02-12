<script>
export default {
  props: {
    contador: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      contador: 0
    }
  },
  methods: {
    aumentar() {
      this.contador++
    },
    disminuir() {
      this.contador--
    }
  },
  computed: {
    color() {
      return this.contador > 0 ? 'green' : this.contador < 0 ? 'red' : 'black'
    }
  }
}
</script>

<template>
  <div>
    <h1>Contador</h1>
    <p :style="{ color }">{{ contador }}</p>
    <button @click="aumentar">Aumentar</button>
    <button @click="disminuir">Disminuir</button>
  </div>
</template>

<style scoped>
div {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

</style>