<template>
  <div class="container py-5">

    <div class="card shadow p-4 mx-auto" style="max-width: 500px; border-radius: 16px;">
      
      <h3 class="text-center fw-bold mb-4">Dashboard Mahasiswa</h3>

      <!-- Data Mahasiswa -->
      <div v-if="user">

        <p><strong>Nama:</strong> {{ user.nama }}</p>
        <p><strong>NIM:</strong> {{ user.nim }}</p>
        <p><strong>Program Studi:</strong> {{ user.prodi }}</p>
        <p><strong>UPBJJ:</strong> {{ user.upbjj }}</p>
        <p><strong>Jenis Kelamin:</strong> {{ user.jenis_kelamin }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>

      </div>

      <!-- Tombol Logout -->
      <button class="btn btn-danger w-100 fw-semibold mt-3" @click="logout">
        Logout
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const saved = localStorage.getItem("userLogin")
  if (!saved) {
    // Jika belum login → balik ke halaman login
    window.location.href = "/"
  } else {
    user.value = JSON.parse(saved)
  }
})

const logout = () => {
  localStorage.removeItem("userLogin")
  window.location.href = "/"
}
</script>
