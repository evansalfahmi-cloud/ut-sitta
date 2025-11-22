<template>
  <div class="card p-4 shadow text-center" style="width: 350px; border-radius: 16px;">
    
    <!-- Logo UT -->
    <div class="d-flex justify-content-center mb-3">
      <img :src="logoUT" alt="UT Logo" style="height: 65px;" />
    </div>

    <!-- Judul Login -->
    <h4 class="fw-bold mb-4">Login SITTA UT</h4>
    
    <form @submit.prevent="login">
      <!-- Username -->
      <div class="mb-3 text-start">
        <label for="username" class="form-label">NIM</label>
        <input 
          type="text" 
          v-model="username" 
          class="form-control" 
          id="username" 
          placeholder="Masukkan NIM"
          required
        >
      </div>

      <!-- Password -->
      <div class="mb-3 position-relative text-start">
        <label for="password" class="form-label">Password</label>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="password" 
          class="form-control" 
          id="password" 
          placeholder="Masukkan password"
          required
        >
        <!-- Icon mata -->
        <i 
          class="bi" 
          :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" 
          @click="togglePassword"
          style="position:absolute; right:10px; top:38px; cursor:pointer;"
        ></i>
      </div>

      <!-- Login Button -->
      <button 
        type="submit" 
        class="btn btn-warning w-100 fw-semibold py-2"
        :disabled="!username || !password || loading"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Login
      </button>
    </form>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import logoUT from '../img/ut.svg'
import { dataMahasiswa } from '../data/datauser.js'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const login = () => {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false
    
    // Cari user berdasarkan NIM
    const user = dataMahasiswa.find(m => m.nim === username.value)

    if (!user) {
      error.value = "NIM tidak ditemukan!"
      return
    }

    // Cocokkan password
    if (password.value !== user.password) {
      error.value = "Password salah!"
      return
    }

    // LOGIN BERHASIL → Simpan data user
    localStorage.setItem("userLogin", JSON.stringify(user))

    // Redirect ke App.vue
    window.location.href = "/"

  }, 1200)
}
</script>
