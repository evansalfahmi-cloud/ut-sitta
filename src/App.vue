<template>
  <LoginForm v-if="!isLoggedIn" />
  <Dashboard v-else />
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'

const isLoggedIn = ref(false)

if (localStorage.getItem("userLogin")) {
  isLoggedIn.value = true
}
</script>
