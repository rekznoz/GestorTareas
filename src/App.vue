<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header: Header,
    Footer: Footer
  }
}

</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
  <Footer />
</template>