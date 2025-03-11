<script>
import {defineComponent} from "vue";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default defineComponent({
  components: {Footer: Footer, Header: Header}
})
</script>

<template>
  <Header/>
  <main class="main">
    <RouterView/>
  </main>
  <Footer/>
</template>