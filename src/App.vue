<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'

const isLoggedIn = ref(false)

if (localStorage.getItem("userLogin")) {
  isLoggedIn.value = true
}
</script>

<template>
  <div>
    <!-- Login tetap di-center -->
    <div v-if="!isLoggedIn" class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <LoginForm />
    </div>

    <!-- Dashboard normal layout -->
    <div v-else>
      <Dashboard />
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
}
</style>
