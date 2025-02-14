<script>

import Contador from './components/Contador.vue'
import Indecision from "./components/Indecision.vue"
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";

export default {
  components: {
    Header,
    Footer: Footer
  }
}

</script>

<template>
  <Header />
  <main class="main">
    <h1>App</h1>
  </main>
  <Footer />
</template>