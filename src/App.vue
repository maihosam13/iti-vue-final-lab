<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <router-view />
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

