<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'

const isLoggedIn = ref(false)

// Cek status login
if (localStorage.getItem("userLogin")) {
  isLoggedIn.value = true
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <LoginForm v-if="!isLoggedIn" />
    <Dashboard v-else />
  </div>
</template>

<style scoped>
body {
  margin: 0;
}
</style>
