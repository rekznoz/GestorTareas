<script>
import footer from "@/components/Footer.vue";
import header from "@/components/Header.vue";

export default {
  components: {
    Header: header,
    Footer: footer
  }
}

</script>

<template>
  <Header/>
  <main class="main">
    <RouterView/>
  </main>
  <Footer/>
</template>