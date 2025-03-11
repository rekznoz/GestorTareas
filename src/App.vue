<script>
import {defineComponent} from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: {Footer, Header}
})
</script>

<template>
  <Header/>
  <main class="main">
    <RouterView/>
  </main>
  <Footer/>
</template>