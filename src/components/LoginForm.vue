<template>
  <div class="card p-4 shadow text-center" style="width: 350px; border-radius: 16px;">
    
    <!-- Logo UT -->
    <div class="d-flex justify-content-center mb-3">
      <img :src="logoUT" alt="UT Logo" style="height: 65px;" />
    </div>

    <h4 class="fw-bold mb-4">Login SITTA UT</h4>
    
    <form @submit.prevent="login">

      <!-- Username -->
      <div class="mb-3 text-start">
        <label class="form-label">NIM / Username</label>
        <input 
          type="text" 
          v-model="username" 
          class="form-control"
          placeholder="Masukkan NIM atau Admin"
          required
        >
      </div>

      <!-- Password -->
      <div class="mb-3 position-relative text-start">
        <label class="form-label">Password</label>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="password" 
          class="form-control"
          placeholder="Masukkan password"
          required
        >
        <i 
          class="bi"
          :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
          @click="togglePassword"
          style="position:absolute; right:10px; top:38px; cursor:pointer;"
        ></i>
      </div>

      <button 
        type="submit" 
        class="btn btn-warning w-100 fw-semibold py-2"
        :disabled="loading"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Login
      </button>
    </form>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Popup Login Berhasil -->
    <div v-if="showSuccess" class="success-popup">
      <div class="popup-box">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 60px;"></i>
        <h4 class="mt-3 fw-bold">Login Berhasil</h4>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref } from "vue"
import logoUT from "../img/ut.svg"
import { dataMahasiswa, adminUsers } from "../data/datauser.js"

const username = ref("")
const password = ref("")
const showPassword = ref(false)
const loading = ref(false)
const error = ref("")
const showSuccess = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const login = () => {
  error.value = ""
  loading.value = true

  setTimeout(() => {
    loading.value = false

    let user = null

    // Cari mahasiswa
    user = dataMahasiswa.find(m => m.nim === username.value)

    // Jika belum ditemukan → cek admin
    if (!user) {
      user = adminUsers.find(a => a.nim === username.value)
    }

    // Jika tetap tidak ketemu
    if (!user) {
      error.value = "User tidak ditemukan!"
      return
    }

    // Cek password
    if (password.value !== user.password) {
      error.value = "Password salah!"
      return
    }

    // Simpan user ke localStorage
    localStorage.setItem("userLogin", JSON.stringify(user))

    // Tampilkan popup berhasil
    showSuccess.value = true

    // Redirect aman (App.vue yang akan menampilkan Dashboard)
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)

  }, 1200)
}
</script>



<style scoped>
.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
  z-index: 9999;
}

.popup-box {
  background: white;
  padding: 30px;
  border-radius: 18px;
  text-align: center;
  width: 260px;
  animation: zoomIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.4); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
